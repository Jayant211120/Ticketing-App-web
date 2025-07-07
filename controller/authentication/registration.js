//Import some libraries and functions
const model=require("../../models/authentication/roleAuthentication");
const bcrypt=require("bcryptjs");//bcrypt is used for hashing the password

//Make functions for controlling buttons
const register=async(req,res)=>{
  //create variable
 const {name,email,password,role,code}=req.body;

 //handle errors using try catch
 try{
 //  change user role
  let userRole='student';

  if(role=='admin' && code==process.env.ADMIN_KEY)
    userRole='admin';

  if((role=='hod' && code==process.env.HOD_KEY_CSE) || (role=='hod' && code==process.env.HOD_KEY_ECE))
    userRole='hod'; 

  if((role=='teacher' && code==process.env.TEACHER_KEY_CSE) || (role=='teacher' && code==process.env.TEACHER_KEY_ECE))
    userRole='teacher';

  //checking email is exist or not
  const existingEmail=await model.findOne({email});
  if(existingEmail)
    return res.status(400).json({message:"User Already Registered"});
 
  //hash the password for security of password
  const hashPassword=await bcrypt.hash(password,10)//10 is salt it means number of times password hasing process is continuing

  //fill data into model
  const User=model({
    name,
    email,
    password:hashPassword,
    role:userRole,
    code,
  });

  //save the model
  await User.save();
  res.status(200).json({message:"Registration Successfull"});
  }catch(err){
    return(
      res.status(400).json({message:"SomeThing went Wrong"})
    );
  }
}
module.exports=register;