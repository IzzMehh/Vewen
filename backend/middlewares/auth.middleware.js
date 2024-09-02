import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

async function verifyJWT(req, res, next) {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!accessToken) {
            return res
                .status(401)
                .send("Unauthorized Request")
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -salt")

        if (!user) {
            return res
                .status(401)
                .send("Invalid Access Token")
        }

        const passwordChangedAt = user.passwordChangedAt
        const passwordChangedAtStoredInJWT = decodedToken.passwordChangedAt * 1000
        const accessTokenExpiry = decodedToken.exp * 1000
        const currentDateInMS = Date.now()

        if((passwordChangedAt > passwordChangedAtStoredInJWT) || (currentDateInMS > accessTokenExpiry ) ){
            return res
            .status(401)
            .send("Invalid Access Token")
        }

        console.log(user)

        req.user = user

        return next()

    } catch (error) {
        return res
            .status(401)
            .send(error?.message || "Invalid Access Token")
    }

}

export default verifyJWT