//Import some libraries and functions
const otpVerify=require("../../models/otp/sendOTP");

//Make function for controlling buttons

const otpVerification=async(req,res)=>{
  //create variables
  const {email,otp}=req.body;

  try{
  //checking email
  const existingEmail=await otpVerify.findOne({email});

  //checking condition
  if(!existingEmail)
    return res.status(400).json({message:"User Not Exist"});

  if(existingEmail.isVerified)
    return res.status(400).json({message:"User Already Exist"});

   // If OTP is incorrect
  if (existingEmail.otp !== Number(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // If OTP expired
  if (existingEmail.otpExpire < Date.now()) {
    return res.status(400).json({ message: "OTP Expired" });
  }
  
  //initialize value
  existingEmail.isVerified=true;

  //save the mail
  await existingEmail.save();
  
  res.status(200).json({message:"Email Verified"});
  }catch(err){
    return res.status(500).json({
    message: "Something went wrong in otpVerification"
   
   });
  }
}

module.exports=otpVerification;