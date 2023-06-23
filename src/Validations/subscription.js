import Joi from 'joi';
const subscriptionSchema = Joi.object({
  classes: Joi.string().required().messages({
    'string.empty': 'Class is required'
  }),
  members: Joi.string().required().messages({
    'string.empty': 'Member is required'
  })
});

export default subscriptionSchema;
