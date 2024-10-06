import { Router } from "express";
import { createPost, deletePost, updatePost } from "../controllers/post.controller.js";
import auth from "../middlewares/auth.js";
import { upload } from "../utils/multer.js";

const postRouter = Router()

postRouter.post('/createPost', auth, upload.array("attachment", 4), createPost)
postRouter.delete('/deletePost', auth, deletePost)
postRouter.put('/updatePost', auth, upload.array("attachment", 4), updatePost)

export default postRouter