const bcrypt = require("bcryptjs");
const model = require("../../models/authentication/roleAuthentication");
const otpModel = require("../../models/otp/sendOTP");

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Input validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get OTP record
    const otpRecord = await otpModel.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: "No OTP request found" });
    }

    // Compare OTP
    if (otpRecord.otp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check OTP expiry
    if (otpRecord.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Find user
    const existingUser = await model.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    // Mark OTP as verified
    otpRecord.isVerified = true;
    await otpRecord.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = resetPassword;
