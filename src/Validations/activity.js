import Joi from 'joi';

const activitySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.pattern.base': 'Name must contains only letters.',
      'string.min': 'Name should have a minimum length of 3 characters'
    })
    .required(),
  description: Joi.string()
    .min(20)
    .max(100)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.pattern.base': 'Description should must contains only letters.',
      'string.min': 'Description should have a minimun of 20 characters'
    })
    .required(),
  isActive: Joi.boolean(),
  trainers: Joi.array().min(1).required()
});
export default activitySchema;
