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
      'string.empty': 'First Name is required'
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
      'string.empty': 'Last Name is required'
    }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.pattern.base': 'Phone Number should only contain numbers',
      'string.base': 'Phone Number should be a string',
      'string.empty': 'Phone Number is required',
      'string.min': 'Phone Number should have a minimum length of 10',
      'string.max': 'Phone Number should have a maximum length of 15'
    }),
  dni: Joi.string()
    .pattern(/^(?!^0)[0-9]{7,11}$/)
    .required()
    .messages({
      'string.pattern.base': 'Dni should be numbers beetween 7 and 10 characters',
      'string.empty': 'Dni is required'
    }),
  city: Joi.string().min(3).required().messages({
    'string.min': 'City should have a minimum length of 3',
    'string.empty': 'City is required'
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
      'string.pattern.base': 'Password should have numbers and letters between 6 and 20 characters',
      'string.empty': 'Password is required'
    })
});

export default adminSchema;
