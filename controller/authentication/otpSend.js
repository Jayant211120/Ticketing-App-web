//Import some libraries and functions
const model=require("../../models/authentication/roleAuthentication");
const sendEmail=require("../../utils/sendEmail");
const otpModel=require("../../models/otp/sendOTP");
//Make functions for controlling buttons
const otpSend=async(req,res)=>{
 try{
  //take variable
  const {email}=req.body;//take from textfield of frontend
   
  //create logic for otp generation and otp expire
  const otp=Math.floor(100000+Math.random()*900000);
  const otpExpire=new Date(Date.now()+10*60*1000);

  //check existing user
  const existingUser=await model.findOne({email});
  //checking condition
  if(existingUser)
    return res.status(400).json({message:"User Already Exists"});
  
  //create model
  const newOTP=otpModel({
    email,
    otp,
    otpExpire,
    isVerified:false,
  });

  //save the user
  await newOTP.save();
  
  //feed data to sendEmail method
  await sendEmail(email,"Check Email",`Your OTP is:${otp}`);
  res.status(200).json({message:"OTP Send Successfully"}); 
 }catch(err){
  res.status(400).json({message:"Something went wrong in otpSend"});
 }
}

module.exports=otpSend;