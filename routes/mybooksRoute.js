const express=require('express');
const router=express.Router();
const multer=require('multer')//midelware
const {updateBook,getMybookForupdate,deleteBook,getMybooks}=require('../controllers/BookController')

const {isAuth}=require('./guardAuth')



router.get("/mybooks",isAuth,getMybooks);


 router.get('/delete/:id',deleteBook);

router.get("/update/:id",getMybookForupdate);

router.post('/update/',multer({

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
,isAuth,updateBook)

module.exports=router;