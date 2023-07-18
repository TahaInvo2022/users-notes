const joiValidationInstance = require("express-joi-validation");
const router = require("express").Router();
const {
  get,
  getById,
  update,
  create,
  remove,
} = require("../controller/NotesController");
const schema = require("../validation-schemas/notes");
const validator = joiValidationInstance.createValidator({ passError: true });

const postSchema = schema.tailor("post");
const putSchema = schema.tailor("put");

router.get("/", async (req, res, next) => {
  return get(req).then(res.success).catch(next);
});

router.get("/:id", async (req, res, next) => {
  return getById(req).then(res.success).catch(next);
});

router.post(
  "/",
  validator.body(postSchema, { joi: { allowUnknown: true } }),
  async (req, res, next) => {
    return create(req).then(res.success).catch(next);
  }
);

router.put(
  "/:id",
  validator.body(putSchema, { joi: { allowUnknown: true } }),
  async (req, res, next) => {
    return update(req).then(res.success).catch(next);
  }
);

router.delete("/:id", async (req, res, next) => {
  return remove(req).then(res.noContent).catch(next);
});

module.exports = router;
