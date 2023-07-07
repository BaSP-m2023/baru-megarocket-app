import Joi from 'joi';
const classSchema = Joi.object({
  activity: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Activity is required'
  }),
  trainer: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Trainer is required'
  }),
  capacity: Joi.number().min(1).max(50).required().integer()
});

export default classSchema;
