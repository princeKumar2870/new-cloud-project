const jwt = require('jsonwebtoken');
const protect = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({error: "No token provided"})
        }
        const token = authHeader.split(' ')[1];
        const decodedUser = jwt.verify(token,process.env.SECRET || "secret123");
        req.user = decodedUser;
        next()
    }catch(err){
        console.error(err.message,"Error in extracting token")
        res.status(401).json({error: "Unauthorised"})
    }
}

const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        if(roles.includes(req.user.role)){
            next()
        }else{
            res.staus(403).json({error: "you are not authorized for this action"})
        }
    }
}

module.exports = {protect,restrictTo}