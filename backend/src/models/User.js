const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            trim: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            minLength: [6,"Password should have a minimum length of 6 characters"]
        },
        role:{
            type:String,
            required:true,
            default:'patient',
            enum:['patient','doctor','admin']
        }
    },
    {
        timestamps:true,
    }
) 
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return;
    }
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds)
    this.password = await bcrypt.hash(this.password,salt)
})
module.exports = mongoose.model('User',userSchema);