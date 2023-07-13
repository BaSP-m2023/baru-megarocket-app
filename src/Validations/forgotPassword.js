import Joi from 'joi';

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+(?!\d)\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': 'This input should be a valid email',
      'string.empty': 'Email is required'
    })
});

export default forgotPasswordSchema;
