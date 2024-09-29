import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String,
        maxLength:500,
        required:true,
    },
    attachments:[
        {
            url:String,
            fileType:String,
        }
    ]
},{
    timestamps:true,
})


export const Post = mongoose.model('Post',postSchema)