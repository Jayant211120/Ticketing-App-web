const generateModel = require("../../models/operations/generateTicket");
const authModel = require("../../models/authentication/roleAuthentication");
const moment=require('moment');
const generateTicket = async (req, res) => {
  try {
    // ✅ Step 1: Get user info from login (token middleware)
    const emailFromLogin = req.user.email;

    // ✅ Step 2: Fetch user from DB using token email
    const existingUser = await authModel.findOne({ email: emailFromLogin });

    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "User not found. Please login again.",
      });
    }

    // ✅ Step 3: Pull user's role and email directly from DB
    const { name, mobileNumber, course, department, roomNumber, problemHeading, problemDetails } = req.body;

    // ✅ Step 4: Create new ticket — user can create multiple
    const now =moment().format("ddd MMM DD YYYY hh:mm:ss A");
    const ticket = new generateModel({
      name,
      email: existingUser.email,       // 💡 always use logged-in email
      mobileNumber,
      role: existingUser.role,         // 💡 always use logged-in user's role
      course,
      department,
      roomNumber,
      problemHeading,
      problemDetails,
      problemRaised:now,
    });

    await ticket.save();

    return res.status(200).json({
      status: true,
      message: "Ticket Successfully Generated",
    });

  } catch (err) {
    console.error("generateTicket error:", err);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = generateTicket;
