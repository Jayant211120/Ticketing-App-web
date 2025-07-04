//Import some libraries
const mongoose=require("mongoose");

//Make schema
  const roleSchema=mongoose.Schema({
    name:{
      type:String,
    },
    email:{
      type:String,
      unique:true,
      required:true,
    },
    password:{
      type:String,
    },
    role:{
      type:String,
      enum:['admin','hod','teacher','student'],
      default:'student',
    },
    token:{type:String}
  },{timestamp:true});
  //Create model
  module.exports=mongoose.model("registrations",roleSchema);
  console.log("Role Model are created successfully");
