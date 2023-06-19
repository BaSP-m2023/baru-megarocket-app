import Joi from 'joi';

const superAdminSchema = Joi.object({
  name: Joi.string().alphanum().trim().min(3).max(50).required(),
  lastName: Joi.string().alphanum().trim().min(3).max(50).required(),
  email: Joi.string()
    .lowercase()
    .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
    .min(3)
    .max(80)
    .required(),
  password: Joi.string().alphanum().min(8).max(50).required()
});

export default superAdminSchema;
