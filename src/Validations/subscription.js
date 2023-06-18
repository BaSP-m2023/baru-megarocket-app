import Joi from 'joi';
const subscriptionSchema = Joi.object({
  classes: Joi.string().required(),
  members: Joi.string().required(),
  date: Joi.string().isoDate().required()
});

export default subscriptionSchema;
