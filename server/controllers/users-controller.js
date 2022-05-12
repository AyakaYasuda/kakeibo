const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs were passed. Please check your data",
      422
    );
    return next(error);
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Failed to sign up. Please try again", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "This user already exists. Please log in instead",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create a user. Please try again",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    spending: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Failed to sign up. Please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toJSON({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Failed to log in. Please try again", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials. Sorry... we could not log you in",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Password was wrong. Sorry... we could not log you in",
      403
    );
    return next(error);
  }

  res.status(200).json({ message: "Successfully logged in!" });
};

exports.signup = signup;
exports.login = login;