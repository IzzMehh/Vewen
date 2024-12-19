import e from "express"
import { login, signup, verifyUser, verifyUserRequest, passwordReset, passwordResetRequest, emailResetRequest, emailReset, isAuthenticated, logout, continueWithGoogle } from "../controllers/user.controller.js"
import { updateUserDetails, uploadProfilePicture, checkUsernameAvailability, followUser, checkEmailAvailability } from "../controllers/userProfile.controller.js"
import auth from "../middlewares/auth.js"
import { upload } from "../utils/multer.js"


const userRouter = e.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post("/loginWithGoogle", continueWithGoogle)
userRouter.post('/verifyUserRequest', verifyUserRequest) // get a new otp
userRouter.patch('/verifyAccount', verifyUser)
userRouter.post('/passwordResetRequest', passwordResetRequest)
userRouter.patch('/passwordReset', passwordReset)
userRouter.post('/emailResetRequest', auth, emailResetRequest)
userRouter.patch('/emailReset', auth, emailReset)
userRouter.get('/auth',auth, isAuthenticated);
userRouter.get('/logout', auth, logout)

// UPDATE USER PROFILE

userRouter.patch('/updateUserDetails', auth, updateUserDetails)
userRouter.patch('/uploadProfilePicture', auth, upload.single('profileImg'), uploadProfilePicture)
userRouter.get('/checkUsernameAvailability', checkUsernameAvailability)
userRouter.get('/checkEmailAvailability', checkEmailAvailability)
userRouter.post('/followUser', auth, followUser)
export default userRouter