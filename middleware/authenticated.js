const { UnauthorizedError } = require("../core/errors");
const { User: UserModel } = require("../models");
const jwt = require("jsonwebtoken");

const strategies = {
  // Middleware function for JWT authentication
  async jwt(req, res, next) {
    try {
      const token = req.get("x-access-token");

      // If token is not provided, throw an error
      if (!token) {
        throw new UnauthorizedError();
      }

      // Verify the token and extract the email and user_id
      const { email, user_id } = jwt.verify(token, process.env.TOKEN_KEY);

      // If user_id or email is not present in the token, throw an error
      if (!(user_id && email)) {
        throw new UnauthorizedError();
      }

      // Find the user based on the user_id
      const user = await UserModel.findByPk(user_id);

      // Attach the user object to the request object
      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = (strategy = "jwt") => strategies[strategy];
