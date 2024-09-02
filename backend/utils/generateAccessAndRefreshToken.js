import { User } from "../models/user.model.js";
import mongoose from "mongoose";


async function generateAccessAndRefreshToken(userId) {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw error
    }
}

export default generateAccessAndRefreshToken