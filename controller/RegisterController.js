const { EmailInUseError } = require("../core/errors");
const { User: UserModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Async function for user registration
  async registerUser(req) {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await UserModel.findOne({
      where: {
        email,
      },
    });

    // If user already exists, throw an error
    if (existingUser) {
      throw new EmailInUseError(
        "Please use a different email. This email is already in use."
      );
    }

    // Create a hashed password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 6);

    // Create a new user with the provided payload
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create a JWT token for the newly registered user
    const token = jwt.sign(
      { user_id: newUser.id, email: newUser.email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    // Prepare the response data containing the new user and the token
    const data = {
      user: newUser,
      token,
    };

    return data;
  },
};
