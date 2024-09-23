import jwt from "jsonwebtoken"

function generateJwtToken(userData) {
    const payload = {
        _id:userData._id,
        username:userData.username,
        email:userData.email,
        passwordVersion:userData.passwordVersion,
    }
    const token = jwt.sign(
        payload,
        process.env.JWT_KEY,
    )

    return token
}

export {
    generateJwtToken,
}