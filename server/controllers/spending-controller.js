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

  res.json({ spending: spending.toObject({ getters: true }) });
};

const getSpendingByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWhoHasSpending;
  try {
    userWhoHasSpending = await User.findById(userId).populate("spending");
  } catch (err) {
    const error = new HttpError(
      "Could not find a user matching with the provided user id",
      500
    );
  }

  if (!userWhoHasSpending || userWhoHasSpending.spending.length === 0) {
    const error = new HttpError(
      "Could not fetch any spending for the provided user id",
      404
    );
    return next(error);
  }

  res.json({
    usersSpending: userWhoHasSpending.spending.map(spending =>
      spending.toObject({ getters: true })
    ),
  });
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
    await createdSpending.save({ session: sess });
    user.spending.push(createdSpending);
    await user.save({ session: sess, validateModifiedOnly: true });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to create new spending...", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ spending: createdSpending.toObject({ getters: true }) });
};

const updateSpending = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    const error = new HttpError(
      "Invalid inputs were passed. Please check your data",
      422
    );
    return next(error);
  }

  const { category, title, amount, memo } = req.body;

  const spendingId = req.params.sid;

  let spendingToUpdate;
  try {
    spendingToUpdate = await Spending.findById(spendingId);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch data of spending to update",
      500
    );
    return next(error);
  }

  if (!spendingToUpdate) {
    const error = new HttpError(
      "Could not find the spending for the provided spending id",
      404
    );
    return next(error);
  }

  // make sure that creator and login user are matching
  if (spendingToUpdate.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      "This user is not allowed to update this spending",
      401
    );
    return next(error);
  }

  spendingToUpdate.category = category;
  spendingToUpdate.title = title;
  spendingToUpdate.amount = amount;
  spendingToUpdate.memo = memo;

  try {
    await spendingToUpdate.save();
  } catch (err) {
    const error = new HttpError(
      "Failed to update the spending. Please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({
    spendingId: spendingToUpdate.id,
    spending: spendingToUpdate.toObject({ getters: true }),
  });
};

const deleteSpending = async (req, res, next) => {
  const spendingId = req.params.sid;

  let spendingToDelete;
  try {
    spendingToDelete = await Spending.findById(spendingId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Could not fetch data of spending to delete",
      500
    );
    return next(error);
  }

  if (!spendingToDelete) {
    const error = new HttpError(
      "Could not find the spending for the provided spending id",
      404
    );
    return next(error);
  }

  // make sure that creator and login user are matching
  if (spendingToDelete.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "This user is not allowed to delete this spending",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await spendingToDelete.remove({ session: sess });
    spendingToDelete.creator.spending.pull(spendingToDelete);
    await spendingToDelete.creator.save({
      session: sess,
      validateModifiedOnly: true,
    });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Failed to delete the spending. Please try again",
      500
    );
    return next(error);
  }

  res.status(200).json({ spendingId: spendingToDelete.id });
};

exports.getSpendingById = getSpendingById;
exports.getSpendingByUserId = getSpendingByUserId;
exports.createSpending = createSpending;
exports.updateSpending = updateSpending;
exports.deleteSpending = deleteSpending;
