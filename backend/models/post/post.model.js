import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postedBy:{
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
            public_id:String,
        }
    ]
},{
    timestamps:true,
})


export const Post = mongoose.model('Post',postSchema)