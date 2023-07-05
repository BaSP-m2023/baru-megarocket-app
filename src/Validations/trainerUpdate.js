import Joi from 'joi';

const trainerUpdate = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/)
    .messages({
      'string.base': 'Name should be a string',
      'string.pattern.base': 'Name should only contain alphabetic characters',
      'string.min': 'Name should have a minimum length of 4',
      'string.max': 'Name should have a maximum length of 10',
      'string.empty': 'Name is required'
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z\s]+$/)
    .messages({
      'string.base': 'Last Name should be a string',
      'string.pattern.base': 'Last Name should only contain alphabetic characters',
      'string.min': 'Last Name should have a minimum length of 4',
      'string.max': 'Last Name should have a maximum length of 10',
      'string.empty': 'Last Name is required'
    }),
  dni: Joi.string()
    .min(7)
    .max(10)
    .regex(/^[0-9]+$/)
    .message({
      'string.pattern.base': 'DNI should be only numbers',
      'string.empty': 'DNI is required'
    }),
  phone: Joi.string()
    .min(10)
    .max(12)
    .regex(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'Phone must be only numbers',
      'string.min': 'Phone should have a minimum length of 10',
      'string.empty': 'Phone is required'
    }),
  salary: Joi.string()
    .min(2)
    .max(7)
    .regex(/^[0-9]+$/)
    .message({ 'string.pattern.base': 'Salary must be only numbers' }),
  isActive: Joi.boolean()
});
export default trainerUpdate;
