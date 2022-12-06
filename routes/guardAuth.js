
//ken ena connecte
const isAuth=async(req,res,next)=>{
// ken ena sajelet lentree mtei
if (req.session.userId) {

    next()
} else {
    res.redirect('/login')
}
}


const notAuth=async(req,res,next)=>{
//ken famech user 
    if (req.session.userId) {
        res.redirect('/')
        
    } else {
        next()
    }
    }
module.exports={isAuth,notAuth}