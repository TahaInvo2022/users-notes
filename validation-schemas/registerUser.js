const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  password: Joi.string().min(4).max(6).required(),
  email: Joi.string().email().required(),
});

module.exports = schema;
