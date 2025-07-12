const tokenVerify=require("../../middleware/authentication/tokenVerification");
const generateTicket=require("../../controller/ticketOperations/create");
const checkComplaints=require("../../controller/ticketOperations/fetch");
const removeComplaints=require("../../controller/ticketOperations/delete");
const updateComplaints=require("../../controller/ticketOperations/update");
const getStatus=require("../../controller/ticketOperations/getStatus");
const updateStatus=require("../../controller/ticketOperations/updateStatus");
const createStatus=require("../../controller/ticketOperations/createStatus");
const roleVerification=require("../../middleware/authentication/roleVerification");

const express=require("express");
const router=express.Router();

router.get("/checkComplaints",tokenVerify,checkComplaints);
router.get("/getStatus/:id",tokenVerify,getStatus);


router.post("/raisedProblem",tokenVerify,generateTicket);
router.post("/createStatus/:id",tokenVerify,createStatus);

router.put("/update/:id",tokenVerify,updateComplaints);
router.put("/updateStatus/:id",tokenVerify,roleVerification('admin'),updateStatus);

router.delete("/delete/:id",tokenVerify,removeComplaints);

module.exports=router;