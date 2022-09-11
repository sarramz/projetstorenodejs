

const isAuth=async(req,res,next)=>{

if (req.session.userId) {
    next()
} else {
    res.redirect('/login')
}
}
const notAuth=async(req,res,next)=>{

    if (req.session.userId) {
        res.redirect('/')
        
    } else {
        next()
    }
    }
module.exports={isAuth,notAuth}