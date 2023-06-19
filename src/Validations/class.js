import Joi from 'joi';
const classSchema = Joi.object({
  activity: Joi.string().hex().length(24).required(),
  trainer: Joi.string().hex().length(24).required(),
  day: Joi.string()
    .regex(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/)
    .required(),
  time: Joi.string()
    .regex(/^([0-9]|[01]\d|2[0-3]):([0-5]\d)$/)
    .required(),
  capacity: Joi.number().min(1).max(50).required().integer()
});

export default classSchema;
