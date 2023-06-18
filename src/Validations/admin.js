import Joi from 'joi';

const adminSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .min(3)
    .max(20)
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .min(3)
    .max(20)
    .required(),
  dni: Joi.number().min(10000000).max(100000000).integer().positive().required(),
  phone: Joi.number().min(1000000000).max(10000000000).integer().positive().required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  city: Joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .min(3)
    .max(50)
    .required(),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .min(8)
    .required()
});

export default adminSchema;
