const statusModel = require("../../models/operations/status");
const moment=require("moment");
const updateStatus = async (req, res) => {
  const { id } = req.params; // this is ticketId
  const { status } = req.body;

  // Authorization check
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: false, message: "Only admin can update status" });
  }

  try {
    const now =moment().format("ddd MMM DD YYYY hh:mm:ss A");
    const updatedData = await statusModel.findOneAndUpdate(
       {ticketId: id} ,
       {
        status ,
        timeAndDate:now
      },
       {new: true}
    );

    if (!updatedData) {
      return res.status(404).json({ status: false, message: "Status record not found for this ticket" });
    }

    res.status(200).json({status: true,message: "Status updated successfully",data:updatedData});
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};

module.exports = updateStatus;
