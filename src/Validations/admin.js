import Joi from 'joi';

const adminSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(20)
    .required()
    .messages({
      'string.base': 'First Name should be a string',
      'string.pattern.base': 'First Name should only contain alphabetic characters',
      'string.min': 'First Name should have a minimum length of 2',
      'string.max': 'First Name should have a maximum length of 20',
      'string.empty': 'First name is required'
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(20)
    .required()
    .messages({
      'string.base': 'Last Name should be a string',
      'string.pattern.base': 'Last Name should only contain alphabetic characters',
      'string.min': 'Last Name should have a minimum length of 2',
      'string.max': 'Last Name should have a maximum length of 20',
      'string.empty': 'Last name is required'
    }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.pattern.base': 'Phone Number should only contain numbers',
      'string.base': 'Phone Number should be a string',
      'string.min': 'Phone Number should have a minimum length of 10',
      'string.max': 'Phone Number should have a maximum length of 15',
      'string.empty': 'Phone is required'
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
      'string.pattern.base': 'This input should be a valid email',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password should have at least one lowercase letter, one uppercase letter, and one digit',
      'string.empty': 'Password is required'
    })
});

export default adminSchema;
