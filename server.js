const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const flash=require('connect-flash')

const app=express();
app.use(flash());
app.use(express.static(path.join(__dirname,'assets')))
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 3000;

const connectDb = require("./config/connectDb");

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var Store = new MongoDBStore({
  uri: 'mongodb+srv://sarra:23466957@cluster0.phyqo0n.mongodb.net/?retryWrites=true&w=majority',
  collection: 'mySessions'
});
app.use(session({
  
  secret: 'This is a secret key',

  // cookie: {
  //   //duree de vie de token
  //   maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  // },
  store: Store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: false,
  saveUninitialized: true
}));



console.log(process.env.PORT);
app.use(express.json())

const mybooksRoute=require('./routes/mybooksRoute')
app.use('/',mybooksRoute)

const bookRoute=require('./routes/BookRoute')
app.use('/',bookRoute)


const authRoute=require('./routes/AuthRoute')
app.use('/',authRoute)
connectDb();


app.set('view engine','ejs')
app.set('views','views');

app.get('/contact',(req,res,next)=>{
  res.render('contact',{verifUser:req.session.userId})
})
app.get('/about',(req,res,next)=>{
  res.render('about',{verifUser:req.session.userId})
})

app.get('/dashboard',(req,res,next)=>{
  res.render('dashboard',{verifUser:req.session.userId})
})







app.listen(port, (err) => {
  err
    ? console.log("server is failed")
    : console.log(`server is running on ${port}`);
});





