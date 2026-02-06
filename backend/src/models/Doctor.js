const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique:true,
            ref:'User'
        },
        specialization:{
            type:String,
            required:true,
        },
        experience: {
            type: Number,
            required: true,
        },
        fees: {
            type: Number,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
        availability: {
            type: [String], 
            default: []
        },
        isVerified: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model('Doctor',doctorSchema)