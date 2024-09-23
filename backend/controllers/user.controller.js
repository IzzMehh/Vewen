import { User } from "../models/user.model.js";
import { generateJwtToken } from "../utils/generateToken.js";
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

async function login(req,res){
    try {
        const {username, email, password} = req.body

        if(!password || (!username && !email)){
            return res.status(400).send("Email or username are required!!")
        }

        const user = await User.findOne({
            $or:[
                {username},
                {email},
            ]
        })

        if(!user){
            return res.status(401).send("User dosn't exist")
        }

        const isPasswordCorrect =user.comparePassword(password)
        
        if(!isPasswordCorrect){
            return res.status(400).send("Wrong password")
        }

        const token = generateJwtToken(user)

        const options = {
            httpOnly:true,
            secure:true,
        }
        return res.cookie('token',token,options).status(200).send(`Logged in as: ${user.username}`)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export{
    signup,
    login,
}