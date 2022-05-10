const { Router } = require("express");
const { check } = require("express-validator");

const HttpError = require("../models/http-error");
const spendingController = require("../controllers/spending-controller");

const router = Router();

router.get("/:sid", spendingController.getSpendingById);
router.post(
  "/",
  [
    check("category").notEmpty(),
    check("title").notEmpty(),
    check("amount").notEmpty(),
  ],
  spendingController.createSpending
);

module.exports = router;
