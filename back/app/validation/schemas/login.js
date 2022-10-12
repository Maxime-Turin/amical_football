const Joi = require('joi');

const schema = Joi.object({
  mail: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(50)
    .required(),

});

module.exports = schema;
