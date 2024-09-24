import e from "express"
import { login, signup, verifyAccount,getVerfication } from "../controllers/user.controller.js"


const userRouter = e.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/getVerification',getVerfication) // get a new otp
userRouter.post('/verifyAccount',verifyAccount)

export default userRouter