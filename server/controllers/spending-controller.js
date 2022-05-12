const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Spending = require("../models/spending");
const User = require("../models/user");

const getSpendingById = async (req, res, next) => {
  const spendingId = req.params.sid;

  let spending;
  try {
    spending = await Spending.findById(spendingId);
  } catch (err) {
    const error = new HttpError("Could not find spending...", 500);
    return next(error);
  }

  if (!spending) {
    const error = new HttpError("Could not find spending...", 404);
    return next(error);
  }

  res.json({ spending: spending.toJSON({ getters: true }) });
};

const createSpending = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs were passed. Please check your data",
      422
    );
    return next(error);
  }

  const { category, title, amount, memo, creator } = req.body;

  const createdSpending = new Spending({
    category,
    title,
    amount,
    memo,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Could not find the user who is authorized and failed to create new spending",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find the user", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdSpending.save();
    user.spending.push(createdSpending);
    await user.save();
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Failed to create new spending...", 500);
    return next(error);
  }

  res.status(201).json({ spending: createdSpending.toJSON({ getters: true }) });
};

exports.getSpendingById = getSpendingById;
exports.createSpending = createSpending;
