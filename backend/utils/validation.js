import joi from "joi";

const signupValidationSchema = joi.object({
    email:joi.string().email().required().lowercase(),
    username:joi.string().max(25).min(2).required().lowercase(),
    password:joi.string().max(25).min(2).required(),
})

const loginValidationSchema = joi.object({
    email:joi.string().email().lowercase(),
    username:joi.string().max(25).min(2).lowercase(),
    password:joi.string().max(25).min(2).required(),
})

export{
    signupValidationSchema,
    loginValidationSchema,
}