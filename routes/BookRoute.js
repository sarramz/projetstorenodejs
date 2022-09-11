const express=require('express');
const router=express.Router();
// multer lel data image 
const multer=require('multer')//midelware
const {GetBooks,get3books,addBooks,deleteBook,getBookByID,updateBook,getaddbook}=require('../controllers/BookController')


const {isAuth}=require('./guardAuth')

router.get("/",get3books);
router.get("/books",isAuth,GetBooks);
router.get("/books/:id",isAuth,getBookByID);


router.get("/addbook",isAuth,getaddbook)
router.post("/addbook",multer({
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'assets/uploads')
        },
        filename:function (req, file, cb) {
            cb(null, Date.now()+'-'+ file.originalname )      
    }
        })
        }).single('image')
,isAuth,addBooks);



module.exports=router;