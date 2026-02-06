const User = require('../models/User')

const registerUser = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const isPresent = await User.findOne({email});
        if(isPresent) return res.status(400).json({error: "user already present"})
        const newUser = await User.create({name,email,password,role})
        res.status(201).json({
            msg: "User created successfully",
            user:{
                id: newUser._id,
                name: name,
                email:email,
                role: role,
            }
        })
    }catch(err){
        console.error('error in creation of the file',err);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {registerUser}