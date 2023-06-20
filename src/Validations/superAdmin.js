import Joi from 'joi';

const superAdminSchema = Joi.object({
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
      'string.empty': 'Name is required'
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

export default superAdminSchema;
