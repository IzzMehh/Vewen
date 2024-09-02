import mongoose from "mongoose";

const blackListAccessTokenSchema = new mongoose.Schema({
    blAccessToken:{
        type:String,
        unique:true,
        required:true,
    }
})

export const BlacklistAccessToken = mongoose.model("BlacklistAccessToken", blackListAccessTokenSchema) 