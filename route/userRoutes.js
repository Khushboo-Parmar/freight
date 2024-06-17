const express =require('express');
const {register}=require('../controller/POSTAPIs/registerController');
const {login} = require('../controller/POSTAPIs/loginController');
const {submitComplain, getComplaintStatus} = require('../controller/POSTAPIs/complainFormController');
const { getUserComplaints } = require('../controller/GETAPIs/complaintsController');
const authenticateUser = require('../Middleware/authenticateUser');
const { updateComplainStatus } = require('../controller/POSTAPIs/complainStatusController');
const router= express.Router();
// const remmemberController = require('../controller/POSTAPIs/remmemberController')

router.post('/registerformdata', register);
router.post('/login', login);
router.post('/complainFormData', submitComplain);
router.get('/complaints', getUserComplaints);
router.post('/updateComplainStatus', updateComplainStatus);
router.get('/complain/status/:searchId', getComplaintStatus);
// router.use('/credential', remmemberController);


module.exports = router;    