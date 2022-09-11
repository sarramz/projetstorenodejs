const express=require('express');
//body ==En gros, le body-parser a analysé votre requête entrante,
// a assemblé les morceaux contenant vos données de formulaire, 
//puis a créé cet objet body pour vous et l'a rempli avec vos données de formulaire.
//midellware:body.parser thawel el data khater djina fi chakel texte
const body=express.urlencoded({extended:true})

const router=express.Router();
const {LoginUser,GETRegisterPage,POSTRegisterUser,GetLoginPage,logout}=require('../controllers/AuthController')
const {notAuth}=require('./guardAuth')

//pour afficher la page register
router.get('/register',notAuth,GETRegisterPage);

router.post('/register',body,POSTRegisterUser);


router.get('/login',notAuth,GetLoginPage);
router.post('/login',body,LoginUser);


router.post('/logout',logout)
module.exports=router;