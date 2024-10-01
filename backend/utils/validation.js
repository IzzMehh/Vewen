import joi from "joi";

const authValidation = joi.object({
    email: joi.string()
    .email()
    .messages({
      'string.email': 'Please enter a valid email address.',
    }),

    username: joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .messages({
      'string.alphanum': 'Username can only contain letters and numbers.',
      'string.min': 'Username should be at least 3 characters long.',
      'string.max': 'Username should not exceed 15 characters.',
    }),

    password: joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password should not exceed 30 characters.',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    })
})

export{
    authValidation
}