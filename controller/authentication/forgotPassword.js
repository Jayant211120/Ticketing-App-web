const model = require("../../models/authentication/roleAuthentication");
const sendEmail = require("../../utils/sendEmail");
const otpModel = require("../../models/otp/sendOTP");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    // Check user exists
    const existingUser = await model.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not registered" });
    }

    // Create or update OTP in separate collection
    const updatedOTP = await otpModel.findOneAndUpdate(
      { email },
      { email, otp, otpExpire, isVerified: false },
      { upsert: true, new: true }
    );

    // Send OTP via email
    await sendEmail(email, "Reset Your Password", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = forgotPassword;
