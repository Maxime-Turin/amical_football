const Joi = require('joi');

const schema = Joi.object({
  teamName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  mail: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(50)
    .required(),

  passwordConfirm: Joi.ref('password'),

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
    .length(5),
});

module.exports = schema;
