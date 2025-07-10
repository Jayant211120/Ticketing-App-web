const ticketModel = require("../../../models/operations/generateTicket");

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ticketModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Ticket Not Found" });
    }

    res.status(200).json({ status: true, message: "Ticket Deleted Successfully", data: deleted });
  } catch (err) {
    console.error("❌ Error deleting ticket:", err);
    res.status(500).json({ status: false, message: "Something went wrong", error: err.message });
  }
};

module.exports = remove;
