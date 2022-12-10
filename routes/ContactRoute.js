const route=require('express').Router()
const contactController=require('../controllers/contactController')

route.get('/contact',contactController)


module.exports=route