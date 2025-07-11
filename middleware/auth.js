module.exports.cheakelogin=(req,res,next)=>{
    if(req.cookies && req.cookies.AdmineID){
        next();
    } else {
        return res.render('SignIN');
    }
}