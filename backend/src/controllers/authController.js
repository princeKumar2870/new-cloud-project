const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
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

const loginUser = async (req,res)=>{
    try{
        console.log(req.body)
        const {email,password} = req.body;
        const user  = await User.findOne({email});
        if(!user) return res.status(400).json({error: " Invalid Credentials"});
        const isValid = await bcrypt.compare(password,user.password)
        if(!isValid) return res.status(400).json({error: "Invalid Credentials"});
        const token = jwt.sign(
            {id : user._id,role: user.role},
            process.env.SECRET || "secret123",
            {expiresIn: '1d'}
        )
        res.status(201).json({
            msg: "Successfully logged In",
            token: token,
        })
    }catch(err){
        console.error('Internal server error',err);
        return res.status(500).json({error: err.message})
    }
}

const getMe = async (req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findOne({_id: id}).select('-password')
        if(!user) res.status(404).json({error: "user not present"})
        res.status(201).json({user})
    }catch(err){
        console.error("Error in fetching profile",err);
        return res.status(500).json({error: "Internal Server error"})
    }
}
module.exports = {registerUser,loginUser,getMe}