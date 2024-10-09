import { Follow } from "../models/follow.model.js";
import { DeletedAssests } from "../models/post/CloudinaryDeletedAsset.model.js";
import { User } from "../models/user.model.js";
import { uploadProfileImage } from "../utils/cloudinary.js";
import { authValidation } from "../utils/validation.js";
import fs from "fs/promises"

async function updateUserDetails(req, res) {
    try {
        const { newDisplay_name, newUsername, userId } = req.body

        const { error } = authValidation.validate({
            username: newUsername
        })

        if (error) {
            return res.status(400).send(error.message)
        }

        const updateData = {}

        if (!userId) {
            return res.status(400).send('User Id is required')
        }

        if (newDisplay_name) {
            updateData.display_name = newDisplay_name
        }

        if (newUsername) {
            updateData.username = newUsername
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No update provided')
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).send("User doesn't exists!")
        }

        if (req.user._id != userId) {
            return res.status(401).send("Unauthorized Action")
        }

        if (updateData.username) {

            if (user.username == newUsername) {
                return res.status(409).send("Cannot use the current username.")
            }
            const isUsernameExist = await User.findOne({ username: newUsername })

            if (isUsernameExist) {
                return res.status(409).send('Username is already taken')
            }

            user.username = newUsername
        }

        if (updateData.display_name) {

            if (user.display_name == newDisplay_name) {
                return res.status(409).send("Cannot use the current Display name.")
            }
            user.display_name = newDisplay_name
        }

        await user.save()

        return res.status(200).send("Updated User Details")

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function uploadProfilePicture(req, res) {
    try {
        const { _id } = req.user
        const file = req.file

        if (!file) {
            return res.status(400).send("Profile picture required!")
        }

        if (!_id) {
            return res.status(400).send('Cannot find user Id')
        }

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }

        if (user.profileImage.public_id) {
            const deletedAssests = [
                {
                    public_id: user.profileImage.public_id,
                    fileType: "image",
                }
            ]
            await DeletedAssests.create({ deletedAssests })
        } else {
            console.log('no profileimg', user.profileImage)
        }

        const uploadedProfileImg = await uploadProfileImage(file.path)

        await fs.unlink(file.path)

        const newProfileImgData = {
            public_id : uploadedProfileImg.public_id,
            url : uploadedProfileImg.url,
        }

        user.profileImage = newProfileImgData

        await user.save()

        return res.status(200).json({
            message: 'Updated Profile Image',
            url:uploadedProfileImg.url,
        })


    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function checkUsernameAvailability(){
    try {
        const { username } = req.query

        const user = await User.findOne({username})

        if(!user){
            return res.status(200).send('Available')
        }else{
            return res.status(409).send('Not available')
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function followUser(req,res){
    try {
        const { followUserId } = req.body
        const { _id } = req.user

        if(!followUserId){
            return res.status(400).send('User to be followed required')
        }
        if(!_id){
            return res.status(400).send("User Id required")
        }

        await Follow.create({
            followedBy:_id,
            followedUser:followUserId,
        })

        return res.status(200).send('followed')

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("Already followed")
        }
        return res.status(500).send(error.message)
    }
}

export {
    updateUserDetails,
    uploadProfilePicture,
    checkUsernameAvailability,
    followUser,
}