import mongoose from "mongoose";

const followModel = new mongoose.Schema({
    likedPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{
    timestamps:true,
})

export const Follow = new mongoose.model("Follow",followModel)