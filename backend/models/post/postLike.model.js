import mongoose from "mongoose";

const likepostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }
}, {
    timestamps: true,
})

likepostSchema.index({ userId: 1, postId: 1 }, { unique: true });


export const Likepost = mongoose.model('Likepost', likepostSchema)