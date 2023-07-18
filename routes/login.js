const joiValidationInstance = require("express-joi-validation");
const router = require("express").Router();
const { login } = require("../controller/LoginController");
const schema = require("../validation-schemas/loginUser");
const validator = joiValidationInstance.createValidator({ passError: true });

router.post(
  "/",
  validator.body(schema, { joi: { allowUnknown: true } }),
  async (req, res, next) => {
    return login(req).then(res.success).catch(next);
  }
);

module.exports = router;
