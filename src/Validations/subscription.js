import Joi from 'joi';
const subscriptionSchema = Joi.object({
  classes: Joi.string().required(),
  members: Joi.string().required()
});

export default subscriptionSchema;
