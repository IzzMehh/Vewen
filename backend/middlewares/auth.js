import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

async function auth(req,res,next){
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).send("unauthorized")
        }

        const decode = jwt.verify(token,process.env.JWT_KEY)

        if(!decode){
            return res.status(401).send('Invalid JWT- unauthorized')
        }

        const user = await User.findById(decode._id)

        if(!user){
            return res.status(401).send('Invalid user - unauthorized')
        }

        if(decode.passwordVersion !== user.passwordVersion){
            return res.status(401).send('Expired JWT - unauthorized')
        }

        next()

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default auth