//Import some libraries
const nodemailer=require("nodemailer");//nodemailer is used for send mail for email verification

//function for sending email
const sendEmail=async(email,message,text)=>{
  try{
    //create transport is used for creating data
    const mail=await nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      }
    });
    //SendMail is used for sending mail
    await mail.sendMail({
      from:process.env.EMAIL_USER,
      to:email,
      message,
      text,
    });
  }catch(err){
    console.log(err);
  }
};

module.exports=sendEmail;