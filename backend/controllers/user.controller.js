import { User } from "../models/user.model.js";
import { generateJwtToken } from "../utils/generateToken.js";
import { verifyUserRequestEmail, verifyUserConfirmationEmail, passwordResetRequestEmail, passwordResetConfirmationEmail, emailResetRequestEmail, emailResetConfirmationEmail } from "../utils/mailTrap.js";
import randomNumber from "../utils/randomNumber.js";
import { authValidation } from "../utils/validation.js";
import crypto from "node:crypto"
import moment from "moment"


async function continueWithGoogle(req, res) {
    try {
        const { googleId, email, display_name, verified, profileImage } = req.body;
        console.log(profileImage)

        if (!googleId || !email || !display_name) {
            throw new Error("Missing required fields");
        }

        let user = await User.findOne({
            $or: [{ googleId }, { email }],
        });

        if (!user) {
            let username = display_name.toLowerCase().slice(0, 18).replace(/ /g, '_');

            const isUsernameExist = await User.findOne({ username });
            if (isUsernameExist) {
                username = `${username}${randomNumber()}`;
            }

            user = await User.create({
                email,
                username,
                display_name,
                verified,
                googleId,
                profileImage: { url: profileImage, public_id: null },
            });

            if (!user) {
                throw new Error("User creation failed");
            }
        }

        const isCreatedByGoogle = await User.findOne({
            email,
            googleId: { $exists: true, $eq: user.googleId },
        });

        if (isCreatedByGoogle) {
            console.log("User created via Google");

            const token = generateJwtToken(user);

            const options = {
                httpOnly: true,
                secure: true,
            };

            return res
                .cookie("token", token, options)
                .status(200)
                .send("success");
        } else {
            throw new Error("Account already exists with a different method");
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}


async function signup(req, res) {
    try {
        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(400).send("Email, username and password are required!!")
        }

        const { error, value } = authValidation.validate(
            {
                email,
                password,
                username,
            }
        )

        if (error) {
            return res.status(400).send(error.message)
        }

        const userExist = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (userExist) {
            return res.status(404).send("User doesn't exist")
        }

        const user = await User.create({
            email, password, username
        })

        const verificationToken = randomNumber()

        user.verificationToken = verificationToken
        user.verificationTokenExpiredAt = Date.now() + 15 * 60 * 1000;

        await user.save()

        verifyUserRequestEmail(user)

        await login(req, res)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function login(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username && !email) {
            return res.status(400).send("Email or username are required!!")
        }

        if (!password) {
            return res.status(400).send("Password is required!!")
        }

        const { error, value } = authValidation.validate({
            username, email, password
        })

        if (error) {
            return res.status(400).send(error.message)
        }

        const user = await User.findOne({
            $or: [
                { username },
                { email },
            ]
        })

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }

        if (!user.password) {
            return res.status(409).send("Account created with Google")
        }

        const isPasswordCorrect = await user.comparePassword(password)

        if (!isPasswordCorrect) {
            return res.status(400).send("Wrong password")
        }

        const token = generateJwtToken(user)

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        console.log(token)
        return res.cookie('token', token, options).status(200).send(`Logged in as: ${user.username}`)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function verifyUserRequest(req, res) {
    try {
        const { _id } = req.body

        if (!_id) {
            return res.status(400).send('user id must be given')
        }

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }

        if (user.verified) {
            return res.status(409).send("User already Verifed")
        }

        if (user.verificationTokenExpiredAt >= Date.now()) {
            const cooldown = moment(Number(user.verificationTokenExpiredAt))
            const now = moment()
            let cooldownMinutes = cooldown.diff(now, 'minutes')
            let cooldownSeconds = cooldown.diff(now, 'seconds')

            const finalCooldown = cooldownMinutes > 0 ? `${cooldownMinutes} Minutes` : `${cooldownSeconds} Seconds`

            return res.status(409).send(`Try again in ${finalCooldown}`)
        }

        const verificationToken = randomNumber()

        user.verificationToken = verificationToken
        user.verificationTokenExpiredAt = Date.now() + 15 * 60 * 1000;

        await user.save()

        verifyUserRequestEmail(user)

        return res.status(200).send('Sent another code')

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function verifyUser(req, res) {
    try {
        const { code, _id } = req.body

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }

        if (user.verified) {
            return res.status(409).send("User already Verifed")
        }

        if (user.verificationToken != code || user.verificationTokenExpiredAt < Date.now()) {
            return res.status(401).send("Expired or Invalid Code")
        }

        user.verified = true
        user.verificationToken = undefined
        user.verificationTokenExpiredAt = undefined

        await user.save()

        verifyUserConfirmationEmail(user)

        return res.status(200).send('Successfully verified')



    } catch (error) {
        return res.status(500).send(error.message)
    }
}



async function passwordResetRequest(req, res) {
    try {

        const { email, username } = req.body

        if (!email && !username) {
            return res.status(400).send('Email or Username is required!')
        }

        const user = await User.findOne({
            $or: [
                { email }, { username }
            ],
        })

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }

        if (user.passwordResetRequestCooldown >= Date.now()) {
            const cooldown = moment(Number(user.passwordResetRequestCooldown))

            let cooldownMinutes = cooldown.diff(Date.now(), 'minutes')
            let cooldownSeconds = cooldown.diff(Date.now(), 'seconds')

            const finalCooldown = cooldownMinutes > 0 ? `${cooldownMinutes} Minutes` : `${cooldownSeconds} Seconds`
            return res.status(409).send(`Try again in ${finalCooldown}`)
        }

        const passwordResetToken = crypto.randomBytes(10).toString("hex")
        const passwordResetTokenExpiredAt = Date.now() + 60 * 60 * 1000
        const passwordResetRequestCooldown = Date.now() + 10 * 60 * 1000
        user.passwordResetToken = passwordResetToken
        user.passwordResetTokenExpiredAt = passwordResetTokenExpiredAt
        user.passwordResetRequestCooldown = passwordResetRequestCooldown

        await user.save()

        passwordResetRequestEmail(user)

        return res.status(200).send(`Sent password change request to: ${user.email} `)


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function passwordReset(req, res) {
    try {
        const { newPassword, _id, passwordResetToken, currentPassword } = req.body

        if (!newPassword) {
            return res.status(400).send("Password is required")
        }


        const { error, value } = authValidation.validate(
            {
                password: newPassword,
            }
        )

        if (error) {
            return res.status(400).send(error.message)
        }


        if (!passwordResetToken && !currentPassword) {
            return res.status(400).send("Reset Token or Current Password is required")
        }

        if (!_id) {
            return res.status(400).send("User id is required")
        }

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }

        const isPasswordSameAsCurrentPassword = await user.comparePassword(newPassword)

        if (isPasswordSameAsCurrentPassword) {
            return res.status(409).send("New password can't be the same")
        }

        if (currentPassword) {
            const isPasswordCorrect = await user.comparePassword(currentPassword)
            if (!isPasswordCorrect) {
                return res.status(400).send('Wrong Password')
            }

            user.password = newPassword
            user.passwordVersion++
        }
        else {
            if (user.passwordResetToken != passwordResetToken || user.passwordResetTokenExpiredAt < Date.now()) {
                return res.status(400).send("Invalid or expired Reset token")
            }

            user.password = newPassword
            user.passwordVersion++

            user.passwordResetToken = undefined
            user.passwordResetTokenExpiredAt = undefined
        }

        await user.save()

        passwordResetConfirmationEmail(user)

        return res.status(200).send("Password changed!")

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function emailResetRequest(req, res) {
    try {
        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("User doesnt't exists")
        }

        if (user.emailResetTokenExpiredAt >= Date.now()) {
            const cooldown = moment(Number(user.emailResetTokenExpiredAt))
            const now = moment()
            let cooldownMinutes = cooldown.diff(now, 'minutes')
            let cooldownSeconds = cooldown.diff(now, 'seconds')

            const finalCooldown = cooldownMinutes > 0 ? `${cooldownMinutes} Minutes` : `${cooldownSeconds} Seconds`

            return res.status(409).send(`Try again in ${finalCooldown}`)
        }

        const verificationToken = randomNumber()

        user.emailResetToken = verificationToken
        user.emailResetTokenExpiredAt = Date.now() + 60 * 60 * 1000;

        await user.save()

        emailResetRequestEmail(user)

        return res.status(200).send('Check your email')


    } catch (error) {
        return res.status(500).send(error.message)
    }
}



async function emailReset(req, res) {
    try {
        const { newEmail, code, password } = req.body
        const { _id } = req.user

        if (!newEmail) {
            return res.status(400).send("Email is required")
        }


        const { error, value } = authValidation.validate(
            {
                email: newEmail
            }
        )

        if (error) {
            return res.status(400).send(error.message)
        }


        if (!code) {
            return res.status(400).send("OTP is required")
        }

        if (!_id) {
            return res.status(400).send("User id is required")
        }

        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("User doesn't exist")
        }


        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            return res.status(400).send('Wrong Password')
        }

        if (user.emailResetToken != code || user.emailResetTokenExpiredAt < Date.now()) {
            return res.status(400).send("Invalid or expired OTP")
        }

        user.emailResetToken = undefined
        user.emailResetTokenExpiredAt = undefined
        user.email = newEmail

        await user.save()

        emailResetConfirmationEmail(user)

        return res.status(200).send("Email changed!")

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

function isAuthenticated(req, res) {
    console.log(req.user)
    return res.status(200).json(req.user)
}

function logout(req, res) {
    if (!req.cookies.token) {
        return res.status(401).send("You're not logged in!")
    }
    res.clearCookie('token');
    return res.status(200).send(`logged out!`);
}


export {
    continueWithGoogle,
    signup,
    login,
    verifyUserRequest,
    verifyUser,
    passwordResetRequest,
    passwordReset,
    emailResetRequest,
    emailReset,
    isAuthenticated,
    logout,
}