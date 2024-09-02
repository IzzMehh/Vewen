import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    files:[
        {
            type:String,
            default:null
        }
    ],

},{
    timestamps:true,
})

export const Post = new mongoose.model("Post",postModel)