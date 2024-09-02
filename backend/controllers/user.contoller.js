import { User } from "../models/user.model.js";
import crypto from "crypto"
import jwt from "jsonwebtoken"
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken.js";
import { LoggedAccounts } from "../models/loggedAccounts.model.js";

async function createAccount(req, res, next) {
    try {
        const { username, email, password, display_name } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            [username, display_name, email, password].some((feild) => field?.trim() === "")
        ) {
            return res
                .status(400)
                .send("username, display_name, email and password are required")
        }

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .send("Invalid email format");
        }

        const isUserAlready = await User.findOne({ email })

        if (isUserAlready) {
            return res
                .status(409)
                .send("User already exist!")
        }

        const user = await User.create({ email, password, username, display_name })

        return res.status(201).json(user)
    } catch (error) {
        return res.
            status(500)
            .send(error.message)
    }
}

async function login(req, res, next) {
    try {

        const { username, email, password } = req.body

        if (!username || !email) {
            return res
                .status(400)
                .send("Username or email should are required")
        }
        if (!password) {
            return res
                .status(400)
                .send("password are required")
        }

        const user = await User.findOne({
            $or: [{ username, email }]
        })

        if (!user) {
            return res
                .status(404)
                .send("Invalid Credentials")
        }

        const givenPasswordHashed = crypto.createHmac("sha256", user.salt).update(password).digest("hex")

        if (givenPasswordHashed !== user.password) {
            return res
                .status(401)
                .send("Invalid Password")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id)

        const options = {
            httpOnly: true,
            secure: true,
        }

        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip || req.connection.remoteAddress
        const language = req.headers['accept-language'];

        const createSession = await LoggedAccounts.create({
            refreshToken,
            userAccount: user._id,
            userAgent,
            ipAddress,
            language,
        })

        if(!createSession){
            return res.
            status(500)
            .send("Error while creating Session")
        }

        return res
            .cookie('accessToken', accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .send(`Successfully logged in as ${user.username} `)

    } catch (error) {
        return res.
            status(500)
            .send(error.message)
    }
}

export {
    createAccount,
}