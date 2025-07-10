const ticketModel = require("../../../models/operations/generateTicket");
const statusModel = require("../../../models/operations/status");

const getUserStats = async (req, res) => {
  try {
    const userRole = req.user.role;
    const filter = {};

    if (userRole === "student") {
      filter.email = req.user.email; // 🔥 Fix: Match based on email
    } else if (userRole === "teacher" || userRole === "hod") {
      filter.department = req.user.department;
    }

    const userTickets = await ticketModel.find(filter).select("_id");
    const ticketIds = userTickets.map(t => t._id);

    const totalTickets = ticketIds.length;

    const pending = await statusModel.countDocuments({
      ticketId: { $in: ticketIds },
      status: "pending"
    });

    const inProgress = await statusModel.countDocuments({
      ticketId: { $in: ticketIds },
      status: "in-progress"
    });

    const resolved = await statusModel.countDocuments({
      ticketId: { $in: ticketIds },
      status: "resolved"
    });

    res.status(200).json({
      status: true,
      data: {
        totalTickets,
        pending,
        inProgress,
        resolved
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong (user stats)",
      error: err.message
    });
  }
};

module.exports = getUserStats;
