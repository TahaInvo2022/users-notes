const { InvalidCredentialsError } = require("../core/errors");
const { User: UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  // Async function for user login
  async login(req) {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    // If user not found, throw an error
    if (!user) {
      throw new InvalidCredentialsError("Invalid email entered");
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, throw an error
    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid password entered");
    }

    // Create a JWT token
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    return token;
  },
};
