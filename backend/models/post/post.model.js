import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    parentPost:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
        default:null,
        index:1
    },
    content: {
        type: String,
        maxLength: 500,
        required: true,
    },
    attachments: [
        {
            url: String,
            fileType: String,
            public_id: String,
        }
    ],
    isEditied: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})


export const Post = mongoose.model('Post', postSchema)