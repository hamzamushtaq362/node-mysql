const User = require('./../model/user.model');

exports.auth = (req,res,next)=>{
    if(req.headers.token){
        next();
    }else{
        return res.status(401).json({
                message:'Please Login First'
        })
    }
}