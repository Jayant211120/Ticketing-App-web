// Import required libraries
const model = require("../../models/authentication/roleAuthentication");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login controller function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingEmail = await model.findOne({ email });
    if (!existingEmail)
      return res.status(400).json({ message: "User Not Registered" });

    // Validate password
    const compare = await bcrypt.compare(password, existingEmail.password);
    if (!compare)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingEmail._id,
        email: existingEmail.email,
        role: existingEmail.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "2d" }
    );

    // Save token to user object
    existingEmail.token = token;
    await existingEmail.save();

    // Convert Mongoose document to plain object
    const user = existingEmail.toObject();

    // Send proper response
    res.json({
      success: true,
      message: "Login Successfully",
      token,
      name: user.name,
      role: user.role,
    });

    console.log("✅ Login success:", {
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = login;
