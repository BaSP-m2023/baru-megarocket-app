import Joi from 'joi';

const newPasswordSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password should have numbers and letters between 6 and 20 characters',
      'string.empty': 'Password is required'
    }),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password must match'
  })
});

export default newPasswordSchema;
