import e from "express"
import { login, signup, verifyAccount,getVerfication,passwordReset,passwordResetRequest } from "../controllers/user.controller.js"


const userRouter = e.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/getVerification',getVerfication) // get a new otp
userRouter.post('/verifyAccount',verifyAccount)
userRouter.post('/passwordResetRequest',passwordResetRequest)
userRouter.post('/passwordReset',passwordReset)

export default userRouter