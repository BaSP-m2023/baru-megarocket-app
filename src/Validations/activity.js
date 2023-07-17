import Joi from 'joi';

const activitySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.pattern.base': 'Name must contains only letters.',
      'string.min': 'Name should have a minimum length of 3 characters',
      'string.empty': 'Name is required'
    })
    .required(),
  description: Joi.string()
    .min(20)
    .max(100)
    .messages({
      'string.min': 'Description should have a minimun of 20 characters',
      'string.empty': 'Description is required'
    })
    .required(),
  isActive: Joi.boolean(),
  trainers: Joi.array()
    .min(1)
    .required()
    .messages({ 'string.empty': 'At least one Trainer is required' })
});
export default activitySchema;
