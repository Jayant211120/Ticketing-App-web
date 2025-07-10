const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "generateTicket",
    required: true
  },
  name:{
    type:String,
  },
  email:{
    type:String,
  },
  role:{
    type:String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved","reject"],
    default: "pending"
  },
  timeAndDate: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model("status", statusSchema);
