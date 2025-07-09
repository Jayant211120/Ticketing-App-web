const mongoose=require("mongoose");
const generate=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  mobileNumber:{
    type:Number,
    required:true,
  },
  course:{
    type:String,
    required:true,
  },
  department:{
    type:String,
    enum:['cse','ece'],
    default:'cse',
    required:true,
  },
  role:{
    type:String,
    enum:['admin','hod','techer','student'],
    default:'student',
    required:true,
  },
  roomNumber:{
    type:Number,
    required:true,
  },
  problemHeading:{
    type:String,
    required:true,
  },
  problemDetails:{
    type:String,
    required:true,
  },
  status:{
    type:String,
  },
  problemRaised:{
    type:Date
  },
  problemSolved:{
    type:Date,
  }

},{timestamp:true});

module.exports=mongoose.model("generateTicket",generate,"generateTicket");
console.log("generate Ticket are created successfully");