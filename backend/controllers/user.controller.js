import { User } from "../models/user.model.js";
import { signupValidationSchema, loginValidationSchema } from "../utils/validation.js";

async function signup(req, res) {
    try {
        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(400).send("Email, username and password are required!!")
        }

        const { error, value } = signupValidationSchema.validate(
            {
                email,
                password,
                username,
            }
        )

        if (error) {
            return res.status(400).send(error.message)
        }

        const userExist = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (userExist) {
            return res.status(401).send("User with that email or username Exist")
        }

        const user = await User.create({
            email,password,username
        })

        return res.status(201).send(user)


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function login(){
    try {
    } catch (error) {
        
    }
}

export{
    signup,
    login,
}