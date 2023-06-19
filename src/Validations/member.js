import Joi from 'joi';

const memberSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(4)
    .max(10)
    .required()
    .messages({
      'string.base': 'Name should be a string',
      'string.pattern.base': 'Name should only contain alphabetic characters',
      'string.min': 'Name should have a minimum length of 4',
      'string.max': 'Name should have a maximum length of 10',
      'any.required': 'Name is required'
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(4)
    .max(10)
    .required()
    .messages({
      'string.base': 'Last Name should be a string',
      'string.pattern.base': 'Last Name should only contain alphabetic characters',
      'string.min': 'Last Name should have a minimum length of 4',
      'string.max': 'Last Name should have a maximum length of 10',
      'any.required': 'Last Name is required'
    }),
  phone: Joi.string().min(10).required().messages({
    'string.min': 'Phone should have a minimum length of 10',
    'any.required': 'Phone is required'
  }),
  dni: Joi.string()
    .pattern(/^(?!^0)[0-9]{7,11}$/)
    .required()
    .messages({
      'string.pattern.base': 'Dni should be numbers beetween 7 and 10 characters',
      'any.required': 'Dni is required'
    }),
  city: Joi.string().min(3).required().messages({
    'string.min': 'City should have a minimum length of 3',
    'any.required': 'City is required'
  }),
  dob: Joi.date().greater('1923-01-01').less('2005-01-01').required().messages({
    'date.greater': 'Date should be greater than 1923-01-01',
    'date.less': 'Date should be less than 2005-01-01'
  }),
  zip: Joi.number().min(1000).max(9999).required().messages({
    'number.min': 'Zip-code should be greater than 1000',
    'number.max': 'Zip-code should be less than 9999'
  }),
  isActive: Joi.boolean().required(),
  membership: Joi.string().valid('classic', 'only_classes', 'black').required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      'string.pattern.base': 'This input should be a valid email'
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password should have numbers and letters between 6 and 20 characters'
    })
});

export default memberSchema;
