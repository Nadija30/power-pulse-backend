// const Joi = require('joi');

// const registerSchema = Joi.object({
//   name: Joi.string().min(3).required().messages({
//     'any.required': `Missing required name field`,
//   }),
//   email: Joi.string().pattern(emailValidPattern).required(),
//   password: Joi.string().min(6).required(),
// });
// const loginSchema = Joi.object({
//   email: Joi.string().pattern(emailValidPattern).required(),
//   password: Joi.string().min(6).required(),
// });
// const emailSchema = Joi.object({
//   email: Joi.string().pattern(emailValidPattern).required().messages({
//     'any.required': `Missing required email field`,
//   }),
// });