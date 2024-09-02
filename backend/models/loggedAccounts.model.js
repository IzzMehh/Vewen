import mongoose from "mongoose";

const LoggedAccountsSchema = new mongoose.Schema({
    refreshToken:{
        type:String,
        unique:true,
    },
    userAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userAgent:{
        type:String,
        default:"",
    },
    ipAddress:{
        type:String,
        default:"",
    },
    language:{
        type:String,
        default:"",
    },
})


export const LoggedAccounts = mongoose.model("LoggedAccountsToken", LoggedAccountsSchema)