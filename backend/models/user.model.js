import mongoose from "mongoose";
import randomNumber from "../utils/randomNumber.js";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        display_name: {
            type: String,
            minlength: 2,
            maxlength: 25,
            default: `User ${randomNumber()}`
        },
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 25,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordVersion: {
            type: Number,
            default: 0,
        },
        profileImage: {
            type: String,
            url: {
                default: "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain",
            },
            public_id: String
        },
        bannerImage: {
            type: String,
            default: ""
        },
        lastLoggedIn: {
            type: String,
            default: Date.now(),
        },
        verified: {
            type: Boolean,
            default: false,
        },
        passwordResetToken: String,
        passwordResetTokenExpiredAt: String,
        passwordResetRequestCooldown: String,

        verificationToken: String,
        verificationTokenExpiredAt: String,
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 12)
        this.password = hashedPassword
    }
    next()
})

userSchema.methods.comparePassword = async function (password) {
    const isPasswordCorrect = await bcrypt.compare(password, this.password)
    return isPasswordCorrect
}

export const User = mongoose.model("User", userSchema)