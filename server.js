//Import libraries and files
require('dotenv').config();
const cors=require("cors");
const app=require('./app');

//use middleware
app.use(cors());

//listen server
app.listen(process.env.PORT,process.env.HOST,()=>{
  console.log("Server Created Successfully");
});
