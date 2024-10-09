import e from "express"
import { login, signup, verifyUser, verifyUserRequest, passwordReset, passwordResetRequest, emailResetRequest, emailReset } from "../controllers/user.controller.js"
import { updateUserDetails, uploadProfilePicture, checkUsernameAvailability, followUser } from "../controllers/userProfile.controller.js"
import auth from "../middlewares/auth.js"
import { upload } from "../utils/multer.js"


const userRouter = e.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/verifyUserRequest', verifyUserRequest) // get a new otp
userRouter.patch('/verifyAccount', verifyUser)
userRouter.post('/passwordResetRequest', passwordResetRequest)
userRouter.patch('/passwordReset', passwordReset)
userRouter.post('/emailResetRequest', auth, emailResetRequest)
userRouter.patch('/emailReset', auth, emailReset)


// UPDATE USER PROFILE

userRouter.patch('/updateUserDetails', auth, updateUserDetails)
userRouter.patch('/uploadProfilePicture', auth, upload.single('profileImg'), uploadProfilePicture)
userRouter.get('/checkUsernameAvailability/:username', auth, checkUsernameAvailability)
userRouter.post('/followUser', auth, followUser)
export default userRouter