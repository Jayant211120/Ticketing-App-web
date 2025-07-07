const model = require("../../models/authentication/roleAuthentication");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password, role, code } = req.body;

  try {
    console.log("Registration request:", req.body); // optional for debugging

    // Set user role
    let userRole = "student";
    if (role === "admin" && code === process.env.ADMIN_KEY) userRole = "admin";
    if ((role === "hod" && code === process.env.HOD_KEY_CSE) || (role === "hod" && code === process.env.HOD_KEY_ECE)) userRole = "hod";
    if ((role === "teacher" && code === process.env.TEACHER_KEY_CSE) || (role === "teacher" && code === process.env.TEACHER_KEY_ECE)) userRole = "teacher";

    // Check if email already exists
    const existingEmail = await model.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered"
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save user
    const User = model({
      name,
      email,
      password: hashPassword,
      role: userRole,
      code
    });

    await User.save();

    res.status(200).json({
      success: true,
      message: "Registration Successful"
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong during registration"
    });
  }
};

module.exports = register;
