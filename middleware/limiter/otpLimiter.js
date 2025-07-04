//limiter is used sensitive post


//Import some files and libraries
const {rateLimit}=require("express-rate-limit");

//create function
const otpLimiter=rateLimit({
      windowMS:10*60*1000,//for minutes this is:10
      limit:100,
      message:"Please wait for 10 minutes for next otp"
});

module.exports=otpLimiter;