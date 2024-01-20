const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailValidPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailValidPattern,
      required: [true, 'Email is required'],
      unique: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 150,
    },
    currentWeight: {
      type: Number,
      default: 50,
    },
    desiredWeight: {
      type: Number,
      default: 50,
    },

    birthday: {
      type: Date,
      required: true,
      validate: {
        validator: function (birthday) {
          const birthDate = new Date(birthday);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();

          return age >= 18;
        },
        message: 'The user must be over 18 years old.',
      },
      default: 16 / 10 / 1999,
    },

    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    token: {
      type: String,
      default: '',
    },
    bmr: {
      type: Number,
      default: 2300,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': `Missing required name field`,
  }),
  email: Joi.string().pattern(emailValidPattern).required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailValidPattern).required(),
  password: Joi.string().min(6).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailValidPattern).required().messages({
    'any.required': `Missing required email field`,
  }),
});

const addUserParamsSchemaJoi = Joi.object({
  name: Joi.string().required(),
  height: Joi.number().min(150).required().messages({
    'any.required': `Missing required height field`,
  }),
  currentWeight: Joi.number().min(35).required().messages({
    'any.required': `Missing required currentWeigth field`,
  }),
  desiredWeight: Joi.number().min(35).required().messages({
    'any.required': `Missing required desiredWeight field`,
  }),
  birthday: Joi.date().required().messages({
    'any.required': `Missing required birthday field`,
  }),
  blood: Joi.number().valid(1, 2, 3, 4).required().messages({
    'any.required': `Missing required blood field`,
  }),
  sex: Joi.string().lowercase().valid('male', 'female').messages({
    'any.required': `Missing required sex field`,
  }),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
    'any.required': `Missing required levelActivity field`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  addUserParamsSchemaJoi,
};
const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
