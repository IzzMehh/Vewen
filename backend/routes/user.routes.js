import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createAccount } from "../controllers/user.contoller.js";

const userRouter = Router();

userRouter.route('/')
.get((req, res) => {
    res.send("You are in the Home page RN");
})
.post(createAccount)

export default userRouter;
