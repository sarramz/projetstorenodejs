
const Book=require('../models/book')

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

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
  module.exports={get3books}