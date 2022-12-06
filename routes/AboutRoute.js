const route=require('express').Router()
const getPageAbout=require('../controllers/AboutController')

const {notAuth}=require('./guardAuth')

route.get('/about',getPageAbout)


module.exports=route