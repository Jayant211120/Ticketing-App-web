const mongoose=require("mongoose");

//connect is a mongodb function to connect backend with mongodb
const connectionWithMongodb=async()=>{
  try{
    const conn=await mongoose.connect(process.env.URI,{
      useNewUrlParser:true,//if mongodb old version create problem for uri so its handle it
      useUnifiedTopology:true,//replacing old topology
    });
    console.log(`Mongodb Connected:${conn.connection.host}`)//MongoDb connection host is used for returning hostname and ip address
  }catch(err){
    console.error(`Error Connection MongoDb:${err.message}`);
    process.exit(1);//exist is used if connection fail
  }
};

//module.exports is used for accessing function in all over project
module.exports=connectionWithMongodb;