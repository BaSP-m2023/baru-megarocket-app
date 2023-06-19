import Joi from 'joi';

const memberSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(4)
    .max(10)
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(4)
    .max(10)
    .required(),
  phone: Joi.string().min(10).required(),
  dni: Joi.string()
    .pattern(/^(?!^0)[0-9]{7,11}$/)
    .required(),
  city: Joi.string().min(3).required(),
  dob: Joi.date().greater('1923-01-01').less('2005-01-01').required(),
  zip: Joi.number().min(1000).max(9999).required(),
  isActive: Joi.boolean().required(),
  membership: Joi.string().valid('classic', 'only_classes', 'black').required(),
  email: Joi.string().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .required()
});

export default memberSchema;
