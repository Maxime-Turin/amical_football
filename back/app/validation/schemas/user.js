const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number()
    .integer()
    .allow(null, ''),

  teamName: Joi.string()
    .min(2)
    .max(50)
    .allow(null, ''),

  mail: Joi.string()
    .email()
    .allow(null, ''),

  password: Joi.string()
    .min(8)
    .max(50)
    .allow(null, ''),

  picture: Joi.string()
    .max(200)
    .allow(null, ''),

  description: Joi.string()
    .allow(null, ''),

  field: Joi.string()
    .max(30)
    .allow(null, ''),

  level: Joi.string()
    .max(30)
    .allow(null, ''),

  category: Joi.string()
    .max(30)
    .allow(null, ''),

  coachName: Joi.string()
    .max(30)
    .allow(null, ''),

  phone: Joi.string()
    .pattern(/^0([1-7]|[9])(\d{2}){4}$/)
    .allow(null, ''),

  city: Joi.string()
    .max(30)
    .allow(null, ''),

  postalCode: Joi.string()
    .length(5)
    .allow(null, ''),
});

module.exports = schema;
