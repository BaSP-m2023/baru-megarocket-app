import Joi from 'joi';
const classSchema = Joi.object({
  activity: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Activity is required'
  }),
  trainer: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Trainer is required'
  }),
  day: Joi.string()
    .regex(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)$/)
    .required()
    .messages({
      'string.empty': 'Day is required'
    }),
  time: Joi.string()
    .regex(/^([0-9]|[01]\d|2[0-1]):([00]\d)$/)
    .required(),
  capacity: Joi.number().min(1).max(50).required().integer(),
  subscribed: Joi.number().min(0).max(50).integer()
});

export default classSchema;
