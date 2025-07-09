const express = require("express");
const router = express.Router();

// Controllers
const register = require('../../controller/authentication/registration');
const login = require("../../controller/authentication/login");
const sendOtp = require("../../controller/authentication/otpSend");
const verifyOtp = require("../../controller/authentication/otpVerification");
const resendOtp = require("../../controller/authentication/otpResend");
const forgotPassword = require("../../controller/authentication/forgotPassword");
const resetPassword = require("../../controller/authentication/resetPassword");

// Middlewares
const otpLimiter = require("../../middleware/limiter/otpLimiter");
const tokenVerification = require("../../middleware/authentication/tokenVerification");
const roleVerification = require("../../middleware/authentication/roleVerification");
const { registerValidation } = require("../../middleware/validator/registerValidation"); // ✅ destructured correctly
const validate = require("../../middleware/validator/validation"); // ✅ used after validation rules

// Public Routes
router.post('/register', otpLimiter, registerValidation, validate, register);
router.post('/login', login);
router.post('/sendOtp', otpLimiter, sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/resendOtp', otpLimiter, resendOtp);
router.post('/forgotPassword', forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
