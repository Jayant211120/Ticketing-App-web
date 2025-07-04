//Import some libraries and functions
const model=require("../../models/authentication/roleAuthentication");
const bcrypt=require("bcryptjs");//bcrypt is used for hashing the password
const jwt=require("jsonwebtoken");//jsonwebtoken is used for generating token

//Make functions for controlling buttons
const login=async(req,res)=>{
 //create some variables
 const{email,password}=req.body;

 //user try catch for handling errors
 try{
 //check user email already registered or not
 const existingEmail=await model.findOne({email});
 if(!existingEmail)
  return res.status(400).json({message:"User Not Registered"});

 //compare password
 const compare=await bcrypt.compare(password,existingEmail.password);
 if(!compare)
  return res.status(400).json({message:"Invalid Credentials"});

 //generate token for save data in browser
 const token=jwt.sign(
  {id:existingEmail._id,role:existingEmail.role},
  process.env.JWT_KEY,
  {expiresIn:"2d"}
 );
 existingEmail.token=token;
 existingEmail.save();
 //save the token in database
 res.json({message:"Login Successfully",token})
 }catch(err){
  res.status(400).json({message:"Something went wrong"});
 }
}
module.exports=login;