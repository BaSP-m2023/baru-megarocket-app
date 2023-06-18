import Joi from 'joi';

const activitySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z\s]+$/)
    .message({
      'string.pattern.base': 'The name must contains only letters.'
    })
    .required(),
  description: Joi.string()
    .min(20)
    .max(100)
    .pattern(/^[A-Za-z\s]+$/)
    .message({
      'string.pattern.base': 'The description must contains only letters.'
    })
    .required(),
  isActive: Joi.boolean()
});
export default activitySchema;
