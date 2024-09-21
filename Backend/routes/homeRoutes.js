const express=require('express');
const {getUserDashboard}=require('../controllers/dashboardController.js')

const router=express.Router();

router.get('/dashboard',getUserDashboard)


module.exports=router;