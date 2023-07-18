const Joi = require("@hapi/joi");

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = schema;
