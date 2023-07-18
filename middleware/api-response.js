// const UserActivity = require("../services/user-activity");

module.exports = function (req, res, next) {
  res.noContent = () => res.status(204).end();

  res.error = (error) => {
    res.status(error.statusCode).json(error).end();
  };

  res.success = async (data) => {
    data = typeof data.toJSON === "function" ? data.toJSON() : data;
    return res.status(200).json(data).end();
  };

  next();
};
