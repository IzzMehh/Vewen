import mongoose from "mongoose";

const blackListRefreshTokenSchema = new mongoose.Schema({
    blRefreshToken:{
        type:String,
        unique:true,
        required:true,
    }
})

export const BlacklistRefreshToken = mongoose.model("BlacklistRefreshToken", blackListRefreshTokenSchema)