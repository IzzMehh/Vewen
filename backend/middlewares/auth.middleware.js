import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

async function verifyJWT(req, res, next) {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")

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

        req.user = user

        next()

    } catch (error) {
        return res
            .status(401)
            .send(error?.message || "Invalid Access Token")
    }

}

export default verifyJWT