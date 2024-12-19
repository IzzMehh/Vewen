import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

async function auth(req, res, next) {
    try {
        const token = req.cookies.token
        console.log(token);

        if (!token) {
            return res.status(401).send("unauthorized")
        }

        const decode = jwt.verify(token, process.env.JWT_KEY)

        if (!decode) {
            return res.status(401).send('Invalid JWT- unauthorized')
        }

        const user = await User.findById(decode._id).select("_id display_name username email passwordVersion profileImage lastLoggedIn verified bannerImage googleId createdAt updatedAt")

        if (!user) {
            return res.status(401).send('Invalid user - unauthorized')
        }

        if (decode.passwordVersion !== user.passwordVersion) {
            return res.status(401).send('Expired JWT - unauthorized')
        }

        req.user = {
            ...user._doc,
            _id: user._id.toString()
        }

        next()

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default auth