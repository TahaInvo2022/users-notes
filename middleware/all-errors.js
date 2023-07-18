
module.exports = function (err, req, res, next) {
  // console.log('==========================');
  // console.log(err);
  // console.log('==========================');

  let errorlog = {
    name: err.name || "Unknown error",
    code: err.code || "ERR_UNKNOWN",
    statusCode: err.statusCode || 500,
    errors: err.errors || "Internal server error",
    message: err.message || "",
  };

  if (err && err.error && err.error.isJoi) {
    errorlog = {
      errors: err.error.toString(),
      message: err.error.details[0].message,
      statusCode: 400,
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
    };
  }


  // All HTTP requests must have a response
  // so let's send back an error with its status code and message
  res.error(errorlog);

  // If there is anything left after sending response
  next();
};
