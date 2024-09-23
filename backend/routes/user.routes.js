import e from "express"
import { login, signup } from "../controllers/user.controller.js"


const userRouter = e.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)

export default userRouter