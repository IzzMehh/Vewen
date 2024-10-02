import { Router } from "express";
import { createPost, deletePost } from "../controllers/post.controller.js";
import auth from "../middlewares/auth.js";
import { upload } from "../utils/multer.js";

const postRouter = Router()

postRouter.post('/createPost', auth, upload.array("attachment", 4), createPost)
postRouter.delete('/deletePost', auth, deletePost)

export default postRouter