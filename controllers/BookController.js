const Book=require('../models/book')

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);



//allbooks
const GetBooks= async (req, res) => {
    try {
      
      const books = await Book.find();
      
      if (books.length == 0) {
        res.status(401).json({ msg: "your database is empty" });
      } else {
        //sinon on les affiches sous format json
        // res.status.json({books:books})
        res.render('books',{books:books,verifUser:req.session.userId})
      }
    } catch (error) {
      res.status(400).json({ msg: "somthing is wrong" });
    }
  };
//home 3 books
const get3books=async (req, res) => {
    try {
      
      const books = await Book.find({}).limit(3);
      
      if (books.length == 0) {
        res.status(401).json({ msg: "your database is empty" });
      } else {
        //sinon on les affiches sous format json
        // res.status.json({books:books})
        res.render('index',{
          books:books,
          verifUser:req.session.userId})
      }
    } catch (error) {
      res.status(400).json({ msg: "somthing is wrong" });
    }
  };
//details
const getBookByID=async(req,res)=>{
  const id=req.params.id;
  try {
      const book= await Book.findById(id);
      // res.status(200).json({book:book})
      res.render('details',{book:book,verifUser:req.session.userId})
  } catch (error) {
     res.status(200).json({msg:'error'}) 
  }
}


//delete     
const deleteBook=async(req,res)=>
 {const id=req.params.id;
try {
    await Book.deleteOne({_id:id});
   // const Books= await Book.find();
    console.log('user is sucessfully deleted')
    res.redirect('/mybooks')
    //res.status(200).json({msg:'user is sucessfully deleted',users})
} catch (error) {
  console.log('delete is failed')
    //res.status(400).json({msg:'delete is failed'})
    res.redirect('/mybooks')
}
};
//getadd
const getaddbook=async(req,res,next)=>{
  res.render('addbook',{verifUser:req.session.userId,Successmsg:req.flash('Successmsg')[0],
  Errormsg:req.flash('Errormsg')[0]
})
}

//add back
const addBooks=async(req,res)=>{
    // console.log(req.body)
    // console.log(req.file.filename)
      
  const book=req.body;
  console.log(book)
  try {
      //on test si cette objet existe ou pas
      const bookFound=await Book.findOne({title:book.title})
      console.log(bookFound);
      //si elle existe on ne peut pas lajouter dans BD
      if(bookFound){
        //  res.status(401).json({msg:'book already exist'})
        console.log('book already exist')
        req.flash('Errormsg','book already exist')
        res.redirect('/addbook')
        
      }else{
          //si elle nexiste pas il faut les mettre dans bd

          const newbook=new Book({
             title :book.title,
             description:book.description,
            price:book.price,
            author:book.author,
            image:req.file.filename,
            userId:req.session.userId
          });
          //lenregistre
          await newbook.save()
          console.log({msg:'book is sucessfully saved',book:newbook})
         req.flash('Successmsg','book is sucessfully saved')
         res.redirect('/books')
         // res.status(201).json({msg:'book is sucessfully saved',book:newbook})
        
        }
    
  } catch (error) {
    console.log(error)
    req.flash('Errormsg','saving failed')
    res.redirect('/addbook')
     // res.status(403).json({msg:'saving failed'})
  }
 
  
}
const getupdate=async(req,res)=>{
  res.render('updateBook',{bookUpdate:book,verifUser:req.session.userId})
}

  //update  
  const updateBook=async(req,res)=>{
    
    const id=req.params.id
    const book=req.body;
    try {
        await Book.findByIdAndDelete(id,book);
        res.status(200).json({msg:"user is sucessfully updated"})
    } catch (error) {
        res.status(400).json({msg:'update is failed'})
    }
}
//books de user enregistrer dans cette session
const getMybooks=async(req,res)=>{
  try {
      
    const books = await Book.find({userId:req.session.userId});
    console.log(books)
    console.log(req.session.userId)
    if (books.length == 0) {
      res.status(401).json({ msg: "your database is empty" });
    } else {
      
      res.render('mybooks',{mybooks:books,verifUser:req.session.userId})
    }
  } catch (error) {
    res.status(400).json({ msg: "somthing is wrong" });
  }

}
module.exports={getupdate,getMybooks,GetBooks,getaddbook,addBooks,deleteBook,getBookByID,updateBook,get3books}