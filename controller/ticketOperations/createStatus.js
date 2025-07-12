const statusModel = require("../../models/operations/status");
const generateTicket = require("../../models/operations/generateTicket");
const moment = require("moment");

const createStatus = async (req, res) => {
  const { id } = req.params; // yeh manual ticketId ho sakta hai

  try {
    console.log(req.params.id);
    // Step 1: Ticket ko find karo based on ticketId
    const ticket = await generateTicket.findById(id);
    if (!ticket) {
      return res.status(404).json({ status: false, message: "Ticket Not Found" });
    }

    // Step 2: Agar usi ticket ke liye status already bana hai, toh rok do
    const existingStatus = await statusModel.findOne({ ticketId: ticket._id });
    if (existingStatus) {
      return res.status(400).json({ status: false, message: "Status for this ticket already exists" });
    }

    // Step 3: Naya status create karo
    const now = moment().format("ddd MMM DD YYYY hh:mm:ss A");

    const newStatus = new statusModel({
      ticketId: ticket._id,  // yeh MongoDB ObjectId hai
      name: ticket.name,
      email: ticket.email,
      role: ticket.role,
      status: "pending",
      timeAndDate: now,
    });

    await newStatus.save();

    res.status(200).json({
      status: true,
      message: "Status Created Successfully",
      data: newStatus
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = createStatus;
