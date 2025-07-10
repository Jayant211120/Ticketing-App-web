const ticketModel = require("../../../models/operations/generateTicket");
const moment = require("moment"); // For converting date to human-readable format

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    mobileNumber,
    course,
    department,
    roomNumber,
    problemHeading,
    problemDetails
  } = req.body;

  try {
    const ticket = await ticketModel.findById(id);

    if (!ticket) {
      return res.status(404).json({
        status: false,
        message: "Ticket Not Found"
      });
    }
    const now =moment().format("ddd MMM DD YYYY hh:mm:ss A");
    // Update fields
    ticket.name = name;
    ticket.mobileNumber = mobileNumber;
    ticket.course = course;
    ticket.department = department;
    ticket.roomNumber = roomNumber;
    ticket.problemHeading = problemHeading;
    ticket.problemDetails = problemDetails;
    ticket.problemRaised =now; // human-readable update time

    await ticket.save();
    
    res.status(200).json({
      status: true,
      message: "Ticket Updated Successfully",
      data: ticket
    });
  } catch (err) {
    console.error("❌ Error updating ticket:", err);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};

module.exports = update;
