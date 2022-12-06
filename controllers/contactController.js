


const getPageContact=(req,res)=>{
    res.render('contact',{verifUser:req.session.userId})
}
module.exports=getPageContact