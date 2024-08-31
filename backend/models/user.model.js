import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        maxlength:20,
    },
    display_name:{
        type:String,
        required:true,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatarImage:{
        type:String,
    },
    bannerImage:{
        type:String,
    },
    index:true
},{
    timestamps:true
})

export const User = mongoose.model('User',userSchema)