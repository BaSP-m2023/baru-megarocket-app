import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+(?!\d)\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': 'This input should be a valid email',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password should have numbers and letters between 6 and 20 characters',
      'string.empty': 'Password is required'
    })
});

export default loginSchema;
