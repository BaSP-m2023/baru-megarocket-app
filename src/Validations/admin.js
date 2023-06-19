import Joi from 'joi';

const adminSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(4)
    .max(10)
    .required()
    .messages({
      'string.base': 'First Name should be a string',
      'string.pattern.base': 'First Name should only contain alphabetic characters',
      'string.min': 'First Name should have a minimum length of 4',
      'string.max': 'First Name should have a maximum length of 10',
      'any.required': 'First Name is required'
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

export default adminSchema;
