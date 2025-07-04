//Import some libraries and files
require('dotenv').config();
const express=require("express");
const routes=require("./routes/authentication/auth");
const db=require("./config/databaseConnectivity");

//Make object of express 
const app=express();

//database connection
db();

//json
app.use(express.json());

//create middlwares
app.use("/api/auth",routes);

module.exports=app;