import jwt from "jsonwebtoken"

function generateJwtTokens(userData) {
    const payload = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        passwordVersion: userData.passwordVersion,
    }
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign({ _id: userData._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' })

    return {
        accessToken, refreshToken
    }
}

export {
    generateJwtTokens,
}