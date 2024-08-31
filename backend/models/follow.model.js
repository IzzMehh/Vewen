import mongoose from "mongoose";

const followModel = new mongoose.Schema({
    followedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    followedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{
    timestamps:true,
})

export const Follow = new mongoose.model("Follow",followModel)