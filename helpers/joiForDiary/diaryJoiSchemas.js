const Joi = require('joi');

const validDatePattern = /^\d{4}-\d{2}-\d{2}$/;


const addProductJoiSchema = Joi.object({
  productId: Joi.string().required().messages({
    'any.required': "Missing required productId field",
  }),
  date: Joi.string().pattern(validDatePattern).required().messages({
    'string.base': 'Date must be a string',
    'string.pattern.base': "Date should be 'yyyy-mm-dd' format",
    'any.required': "Missing required date field",
  }),
  grams: Joi.number().min(1).required().messages({
    'any.required': 'Missing required grams field',
  }),
  calories: Joi.number().min(1).required().messages({
    'any.required': 'Missing required calories field',
  }),
  allowed: Joi.boolean().required().messages({
    'any.required': 'Missing required allowed field',
  }),
});


const addExerciseJoiSchema = Joi.object({
  exerciseId: Joi.string().required().messages({
    'any.required': "Missing required exerciseId field",
  }),
  date: Joi.string().pattern(validDatePattern).required().messages({
    'string.base': 'Date must be a string',
    'string.pattern.base': "Date should be 'yyyy-mm-dd' format",
    'any.required': "Missing required date field",
  }),
  duration: Joi.number().min(1).required().messages({
    'any.required': 'Missing required duration field',
  }),
  burnedCalories: Joi.number().min(1).required().messages({
    'any.required': 'Missing required burnedCalories field',
  }),
});


const schemas = {
  addProductJoiSchema,
  addExerciseJoiSchema,
};

module.exports = { schemas };