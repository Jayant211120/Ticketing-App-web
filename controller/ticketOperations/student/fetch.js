
const ticktingModel=require("../../../models/operations/generateTicket");

const fetchData=async(req,res)=>{
  try{
    const {role}=req.user;
    const data=await ticktingModel.find({role}).sort({_id:-1});
    if(!data || data.length==0){
      return res.json({status:false,message:"Data not found"});
    }
    res.status(200).json({status:true,message:"Data Fetch Successfully",data});
  }catch(err){
    res.status(400).json({status:false,message:"Something went wrong"});
  }
}
module.exports=fetchData;