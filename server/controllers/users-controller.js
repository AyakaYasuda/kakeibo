const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Invalid inputs were passed. Please check your data',
      422
    );
    return next(error);
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Failed to sign up. Please try again', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'This user already exists. Please log in instead',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create a user. Please try again',
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
    const error = new HttpError('Failed to sign up. Please try again', 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Failed to sign up. Please try again', 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Failed to log in. Please try again', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials. Sorry... we could not log you in',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Password was wrong. Sorry... we could not log you in',
      403
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Failed to log in. Please try again', 500);
    return next(error);
  }

  res.status(200).json({
    userId: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    token: token,
  });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('Could not find a user...', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find a user...', 404);
    return next(error);
  }

  res.json({ user: user });
};

exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
