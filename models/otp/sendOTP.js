//Import some libraries
const mongoose=require("mongoose");

//Make schema
  const otpSchema=mongoose.Schema({
    email:{
      type:String,
      unique:true,
      required:true
    },
    otp:{
      type:Number,
    },
    otpExpire:{
      type:Date
    },
    isVerified:{
      type:Boolean,
      default:false,
    }
  });
  
console.log("otp model are successfully created");
  
module.exports=mongoose.model("sendotps",otpSchema);