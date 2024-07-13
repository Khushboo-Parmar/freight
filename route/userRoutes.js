const express =require('express');
const {register}=require('../controller/POSTAPIs/registerController');
const {login} = require('../controller/POSTAPIs/loginController');
// const {submitComplain, getComplaintStatus} = require('../controller/POSTAPIs/complainFormController');
const { getUserComplaints } = require('../controller/GETAPIs/complaintsController');
const authenticateUser = require('../Middleware/authenticateUser');
const { updateComplainStatus } = require('../controller/POSTAPIs/complainStatusController');
const profileUpdateController = require('../controller/POSTAPIs/profileUpdateController');
const { signUp } = require('../controller/POSTAPIs/signUpController');
const sendOTP = require('../controller/POSTAPIs/VerificationController');
const verifyOTP = require('../controller/POSTAPIs/otpVerifyController');
const { submitComplain, getComplaintStatus } = require('../controller/POSTAPIs/complainFormController');
const { getClaimHistory } = require('../controller/GETAPIs/claimHistory');
const { forgotPassword, resetPassword } = require('../controller/POSTAPIs/ForgotPasswordController');

const router= express.Router();


router.post('/registerformdata', register);
router.post('/signup/:phoneNumber', signUp);
router.post('/login', login);
router.post('/claim/:phoneNumber', submitComplain)
router.get('/complaints', getUserComplaints);
router.post('/updateComplainStatus', updateComplainStatus);
router.get('/complain/status/:searchId', getComplaintStatus);
router.post('/updateProfile/:userId', profileUpdateController);
router.post('/send-verification-code', sendOTP);
router.post('/verifyOTP', verifyOTP);
router.get('/getClaimHistory/:userId', getClaimHistory);
router.post('/forgotPassword', forgotPassword);
router.post('/reset-password/:token', resetPassword);
module.exports = router;    