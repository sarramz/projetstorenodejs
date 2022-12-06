const express=require('express');
const router=express.Router();
// multer lel data image 
const multer=require('multer')//midelware
const {GetBooks,addBooks,deleteBook,getBookByID,updateBook,getaddbook}=require('../controllers/BookController')


const {isAuth}=require('./guardAuth')


//la page matethal ken mayebda authentifiee etheka aleh hatina isAuth
router.get("/books",isAuth,GetBooks);
router.get("/books/:id",isAuth,getBookByID);

router.get("/addbook",isAuth,getaddbook)
router.post("/addbook",multer({

    storage : multer.diskStorage({
      //destination lel photo win theb thotha   
        destination: function (req, file, cb) {
          cb(null, 'assets/uploads')
        },
        filename:function (req, file, cb) {
            cb(null, Date.now()+'-'+ file.originalname )      
    }
        })
        }).single('image')
        //single car je vais prendre une seul image
,isAuth,addBooks);



module.exports=router;