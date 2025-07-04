//Import some libraries and functions
const model=require("../../models/authentication/roleAuthentication");
const otpModel=require("../../models/otp/sendOTP");
const sendEmail=require("../../utils/sendEmail");

//Make functions for controlling buttons
const resendOTP=async(req,res)=>{
   //Take variables
   const {email}=req.body;
   const otp=Math.floor(100000+Math.random()*900000);
   const otpExpire=new Date(Date.now()+10*60*1000);

   //Handle errors using try and catch
   try{
    //check otp record is exists or not
    const otpRecord=await otpModel.findOne({email});

    //checking condition
    if (!otpRecord)
      return res.status(404).json({ message: "No OTP request found" });

    if(otpRecord.isVerified)
      return res.status(400).json({ message: "User already verified" });
    
    otpRecord.otp = otp;
    otpRecord.otpExpire = otpExpire;
    //save the otp
    await otpRecord.save();
       
   //fill data to sendEmail
   await sendEmail(email,'Check your OTP',`OTP is:${otp}`);

  res.status(200).json({message:"OTP ReSend successfully"});
  }catch(err){
    res.status(200).json({message:"Something went wrong in otpResend"});
  }
}

module.exports=resendOTP;