const bodyParser = require("body-parser");

module.exports = [
  bodyParser.urlencoded({ limit: "16mb", extended: false }),
  bodyParser.json({ limit: "16mb", type: ["json", "application/csp-report"] }),
];
