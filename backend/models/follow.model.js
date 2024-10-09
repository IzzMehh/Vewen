import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    followedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},
{
    timestamps:true,
})

followSchema.index({ followedBy: 1, followedUser: 1 }, { unique: true });

export const Follow = mongoose.model("Follow",followSchema)