const joiValidationInstance = require("express-joi-validation");
const router = require("express").Router();
const { registerUser } = require("../controller/RegisterController");
const schema = require("../validation-schemas/registerUser");
const validator = joiValidationInstance.createValidator({ passError: true });


router.post(
  "/",
  validator.body(schema, { joi: { allowUnknown: true } }),
  async (req, res, next) => {
    return registerUser(req).then(res.success).catch(next);
  }
);

module.exports = router;
