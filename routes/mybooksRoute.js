const express=require('express');
const router=express.Router();

const {getupdate,updateBook,deleteBook,getMybooks}=require('../controllers/BookController')



const {isAuth}=require('./guardAuth')



router.get("/mybooks",isAuth,getMybooks);


 router.get('/delete/:id',deleteBook);

router.get("/update/:id",getupdate);



module.exports=router;