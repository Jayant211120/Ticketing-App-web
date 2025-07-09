const tokenVerify=require("../../middleware/authentication/tokenVerification");
const generateTicket=require("../../controller/ticketOperations/student/create");
const checkComplaints=require("../../controller/ticketOperations/student/fetch");
const express=require("express");
const router=express.Router();


router.post("/raisedProblem",tokenVerify,generateTicket);
router.get("/checkComplaints",tokenVerify,checkComplaints);

module.exports=router;