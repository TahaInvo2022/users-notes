const router = require("express").Router();
const authenticated = require("./authenticated");

// All public routes - need no auth
router.use("/register", require("../routes/registerUser"));
router.use("/login", require("../routes/login"));

// All routes under this need auth (x-access-token) jwt token
router.use(authenticated("jwt"));
router.use("/notes", require("../routes/note"));


module.exports = router;
