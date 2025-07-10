module.exports.cheakelogin=(req,res,next)=>{
    if(req.cookies && req.cookies.AdmineId){
        next();
    } else {
        return res.redirect('/');
    }
}