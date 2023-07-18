const Joi = require("@hapi/joi");
const { NOTE_TYPE } = require("../core/constant");
const noteType = Object.values(NOTE_TYPE);

const schema = Joi.object({
  description: Joi.string()
    .min(10)
    .max(1000)
    .alter({
      post: (schema) => schema.required(),
    }),
  type: Joi.string()
    .valid(...noteType)
    .insensitive()
    .alter({
      post: (schema) => schema.required(),
    }),
});

module.exports = schema;
