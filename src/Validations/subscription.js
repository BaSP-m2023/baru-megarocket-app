import Joi from 'joi';
export const subscriptionSchema = () => {
  const subsSchema = Joi.object({
    classes: Joi.string().required(),
    members: Joi.string().required(),
    date: Joi.string().isoDate().required()
  });
  return subsSchema;
};

export default subscriptionSchema;
