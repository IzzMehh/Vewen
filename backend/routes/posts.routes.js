import { Router } from "express";
import { createPost, deletePost, updatePost, likePost, unLikePost, getPost, getReplies } from "../controllers/post.controller.js";
import auth from "../middlewares/auth.js";
import { upload } from "../utils/multer.js";

const postRouter = Router()

postRouter.post('/createPost', auth, upload.array("attachment", 4), createPost)
postRouter.delete('/deletePost', auth, deletePost)
postRouter.put('/updatePost', auth, upload.array("attachment", 4), updatePost)
postRouter.post('/likePost', auth, likePost)
postRouter.delete('/unlikePost', auth, unLikePost)
postRouter.get('/getPost/:skip?', getPost)
postRouter.get("/getReplies/:postId/:skip?", getReplies)

export default postRouter