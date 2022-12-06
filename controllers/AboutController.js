


const getPageAbout=(req,res)=>{
    res.render('about',{verifUser:req.session.userId})
}

module.exports=getPageAbout