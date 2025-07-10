const ticktingModel = require("../../../models/operations/generateTicket");

const fetchData = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let data;
    if (role === "admin") {
      // Admin can view all tickets
      data = await ticktingModel.find({}).sort({ _id: -1 });
    } else {
      // Other users can only view their own tickets
      data = await ticktingModel.find({ user: _id }).sort({ _id: -1 });
    }

    if (!data || data.length === 0) {
      return res.json({ status: false, message: "Data not found" });
    }

    res.status(200).json({ status: true, message: "Data Fetch Successfully", data });
  } catch (err) {
    res.status(400).json({ status: false, message: "Something went wrong" });
  }
};

module.exports = fetchData;
