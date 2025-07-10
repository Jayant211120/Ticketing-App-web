const tokenVerify=require("../../middleware/authentication/tokenVerification");
const generateTicket=require("../../controller/ticketOperations/student/create");
const checkComplaints=require("../../controller/ticketOperations/student/fetch");
const removeComplaints=require("../../controller/ticketOperations/student/delete");
const updateComplaints=require("../../controller/ticketOperations/student/update");
const getStatus=require("../../controller/ticketOperations/student/getStatus");
const updateStatus=require("../../controller/ticketOperations/student/updateStatus");
const createStatus=require("../../controller/ticketOperations/student/createStatus");
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