const jwt  = require("jwtwebtoken");
require('dotenv').config();

exports.auth = (req,res,next) => {
    try{
        const token = req.body.token;

        if (!token){
           return res.status(401).json({
            success:false,
            message:`token missing`,
           }) 
        }

        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWt_SECRET);
            console.log(decode);

            req.user =  decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:`token is invalid`,
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:`something went wrong. plz try again later`,
        })
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if (req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:`This is a protect route for students`,
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`users role is not matching`,
        })
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if (req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:`This is a protect route for admin`,
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`users role is not matching`,
        })
    }
}