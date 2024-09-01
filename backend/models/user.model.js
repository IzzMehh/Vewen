import mongoose from "mongoose"
import crypto from "crypto"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 20,
    },
    display_name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarImage: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.Z5BlhFYs_ga1fZnBWkcKjQHaHz?rs=1&pid=ImgDetMain"
    },
    bannerImage: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    salt: {
        type: String,
    },
    index: true
}, {
    timestamps: true
})

userSchema.pre("save", function (next) {
    if (this.isModified(this.password)) {
        const salt = crypto.randomBytes(16).toString()
        const hashedPassword = crypto.reateHmac("sha256", salt).update(this.password).digest("hex")

        this.password = hashedPassword
        this.salt = salt
    }
    next()
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        display_name: this.display_name,
        email: this.email,
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    }, 
    process.env.ACCESS_REFRESH_SECRET,
    {
        expiresIn: process.env.ACCESS_REFRESH_EXPIRY,
    }) 
}

export const User = mongoose.model('User', userSchema)