import Joi from 'joi';

const memberSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(10)
    .pattern(/^[a-zA-Z]+$/)
    .message({ 'string.pattern.base': 'Name must be only letters' })
    .required(),
  lastName: Joi.string()
    .min(4)
    .max(10)
    .pattern(/^[a-zA-Z]+$/)
    .message({ 'string.pattern.base': 'Last name must be only letters' })
    .required(),
  phone: Joi.string()
    .min(10)
    .max(12)
    .regex(/^[0-9]+$/)
    .message({ 'string.pattern.base': 'Phone must be only numbers' })
    .required(),
  dni: Joi.string()
    .pattern(/^(?!^0)[0-9]{7,11}$/)
    .message({ 'string.pattern.base': 'DNI must be only numbers' })
    .required(),
  city: Joi.string().min(3).required(),
  dob: Joi.date().greater('1923-01-01').less('2005-01-01').required(),
  zip: Joi.number().min(1000).max(9999).required(),
  isActive: Joi.boolean().required(),
  membership: Joi.string().valid('classic', 'only_classes', 'black').required(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/)
    .message({ 'string.pattern.base': 'Password must be numbers, letters or both' })
    .required()
});

export default memberSchema;
