import { User } from "../models/user.model.js";
import { generateJwtToken } from "../utils/generateToken.js";
import { verificationEmail,verified } from "../utils/mailTrap.js";
import randomNumber from "../utils/randomNumber.js";
import { signupValidationSchema, loginValidationSchema } from "../utils/validation.js";
import bcrypt, { hash } from "bcrypt"

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
            return res.status(409).send("User with that email or username Exist")
        }

        const user = await User.create({
            email,password,username
        })

        const verificationToken = randomNumber()
        
        user.verificationToken = verificationToken
        user.verificationTokenExpiredAt = Date.now() + 15 * 60 * 1000;

        await user.save()

        verificationEmail(user)

        res.status(200).json({_id:user._id})

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

        const { error, value } = loginValidationSchema.validate({
            username,email,password
        })

        if (error) {
            return res.status(400).send(error.message)
        }

        const user = await User.findOne({
            $or:[
                {username},
                {email},
            ]
        })

        if(!user){
            return res.status(401).send("Invalid credentials")
        }

        const isPasswordCorrect = user.comparePassword(password)
        
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

async function getVerfication(req,res) {
    try {
        const { _id } = req.body

        const user = await User.findById(_id)

        if(!user){
            return res.status(400).send("Invalid User")
        }

        if(user.verified){
            return res.status(409).send("User already Verifed")
        }
        const verificationToken = randomNumber()
        
        user.verificationToken = verificationToken
        user.verificationTokenExpiredAt = Date.now() + 15 * 60 * 1000;

        await user.save()

        verificationEmail(user)

        return res.status(200).send('Sent another code')

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function verifyAccount(req,res) {
    try {
        const {code,_id} = req.body

        const user = await User.findById(_id)

        if(!user){
            return res.status(401).send("Invalid User")
        }

        if(user.verificationToken!=code || user.verificationTokenExpiredAt < Date.now()){
            return res.status(401).send("Expired or Invalid Code")
        }

        user.verified = true
        user.verificationToken = undefined
        user.verificationTokenExpiredAt = undefined

        await user.save()

        verified(user)

        return res.status(200).send('Successfully verified')



    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export{
    signup,
    login,
    getVerfication,
    verifyAccount,
}