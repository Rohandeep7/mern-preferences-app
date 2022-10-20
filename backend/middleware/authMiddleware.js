const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const protect=asyncHandler(async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            console.log(token);
            const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decodedToken.id).select('-password')
        }
        catch(err){
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
    next()
})

module.exports={protect}