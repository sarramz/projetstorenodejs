const express=require('express');
const router=express.Router();

const {get3books}=require('../controllers/HomeController')


const {isAuth}=require('./guardAuth')

router.get("/",get3books);



module.exports=router;