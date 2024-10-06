import { User } from "../models/user.model.js";
import { authValidation } from "../utils/validation.js";

async function updateUserDetails(req, res) {
    try {
        const { newDisplay_name, newUsername, userId } = req.body

        const { error } = authValidation.validate({
            username: newUsername
        })

        if(error){
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


export {
    updateUserDetails,
}