const express=require('express');
const {getRating}=require('../controllers/charityController')

const router=express.Router();

router.post('/rating',getRating)


module.exports=router;