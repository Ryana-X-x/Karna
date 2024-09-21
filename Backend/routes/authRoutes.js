const express=require('express')
const {signupUser,loginUser,signupOrg,loginOrg,logoutUser}=require('../controllers/authController.js')

const router=express.Router();

router.post('/user/signup',signupUser)
router.post('/user/login',loginUser)
router.post('/user/logout',logoutUser)

router.post('/org/signup',signupOrg)
router.post('/org/login',loginOrg)

module.exports=router;