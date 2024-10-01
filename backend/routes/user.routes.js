import e from "express"
import { login, signup, verifyUser,verifyUserRequest,passwordReset,passwordResetRequest } from "../controllers/user.controller.js"


const userRouter = e.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/getVerification',verifyUserRequest) // get a new otp
userRouter.post('/verifyAccount',verifyUser)
userRouter.post('/passwordResetRequest',passwordResetRequest)
userRouter.post('/passwordReset',passwordReset)

export default userRouter