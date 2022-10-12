const Joi = require('joi');
const customJoi = Joi.extend(require('@salesflare/joi-date-string'));

const schema = Joi.object({
  id: Joi.number()
    .integer()
    .allow(null, ''),

  date: customJoi.dateString()
    .allow(null, ''),

  level: Joi.string()
    .max(30)
    .allow(null, ''),

  place: Joi.string()
    .max(30)
    .allow(null, ''),

  field: Joi.string()
    .max(30)
    .allow(null, ''),

  category: Joi.string()
    .max(43)
    .allow(null, ''),

});

module.exports = schema;
