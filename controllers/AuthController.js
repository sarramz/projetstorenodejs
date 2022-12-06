
const Users=require('../Models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);


const GETRegisterPage=async(req,res,next)=>{
   // console.log(req.flash('error'))
 res.render('register',{verifUser:req.session.userId,msg:req.flash('error')[0]})

}
const GetLoginPage=async(req,res)=>{
    res.render('login',
    //req.flash array neregistriw fih barcha erreur 
    //howa controlleur d'erreur yji yawed yektebli eli mawjoud al console log
    {verifUser:req.session.userId,msg:req.flash('error')[0]})
}

const POSTRegisterUser=async(req,res,next)=>{
    const user=req.body
    try {
        const foundUser=await Users.findOne({email:user.email})
        if (foundUser) {
        //res.status(401).json({msg:'user already exist'})
        req.flash('error','user already exist')
        console.log('user already exist')
        res.redirect('/register');
        }else{
            const hashedPassword=await bcrypt.hash(user.password,10);
            const newUser=new Users({
                username:user.username,
                email:user.email,
                password:hashedPassword
                                    });
            newUser.save();
            const token = jwt.sign(
                { username:newUser.username,
                    email:newUser.email ,
                    id:newUser._id
                }
                    , 'shhhhh'
                );
           //  res.status(200).json({newUser,token})
          //  res.status(200).json({newUser})
            console.log("registred",{newUser,token})
            res.redirect('/login')
            }
    } catch (error) {
       req.flash('error',error)
       res.redirect('/register');
   //res.status(400).json({msg:"server error"})
    console.log(error)
    }
}


const LoginUser =async(req,res)=>{
    const user=req.body
    try {
        const foundUser=await Users.findOne({email:user.email});
        const id=foundUser._id
        if (foundUser) {
           const result=await bcrypt.compare(user.password,foundUser.password);
           if (result) {
            const token = jwt.sign(
                {
                    email:foundUser.email ,
                    id:foundUser._id
                }
                    , 'shhhhh'
                );
                console.log(id)
                console.log("login",{foundUser,token})
                req.session.userId =id
                res.redirect('/')
             //res.status(200).json({foundUser,token})
           }else{
           req.flash('error','wrong password')
            res.redirect('/login')
            //res.status(402).json({msg:"wrong password"})
           }
          
           //console.log(result)
        } else {
            req.flash('error','you need to register before')
            res.redirect('/login')
         // res.status(401).json({msg:"you need to register before"})
           
        }
    } catch (error) {
        // res.status(400).json({msg:"server error"})
        // console.log(error)
        req.flash('error','we dont have this user in our database')
        res.redirect('/login');
    }

}

const logout=async(req,res,next)=>{
req.session.destroy(()=>{
    res.redirect('/login')
})
}

module.exports={LoginUser,GETRegisterPage,POSTRegisterUser,GetLoginPage,logout}