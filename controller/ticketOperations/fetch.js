//Import some libraries and functions
const model=require("../../models/authentication/roleAuthentication");

const fetch=async(req,res)=>{
  const data=await model.find();
  res.json({data});
}
module.exports=fetch;