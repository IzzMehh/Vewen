import joi from "joi"

const authValidation = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid email address.",
    }),

  username: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
    .min(3)
    .max(15)
    .messages({
      "string.pattern.base":
        "Username can only contain letters, numbers, and underscores.",
      "string.min": "Username should be at least 3 characters long.",
      "string.max": "Username should not exceed 15 characters.",
    }),

  password: joi.string().min(8).max(30).messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password should not exceed 30 characters.",
  }),
});

export {
    authValidation
}