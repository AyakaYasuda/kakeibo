const { Router } = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/check-auth");
const spendingController = require("../controllers/spending-controller");

const router = Router();

router.get("/:sid", spendingController.getSpendingById);
router.get("/user/:uid", spendingController.getSpendingByUserId);
router.use(checkAuth);
router.post(
  "/",
  [
    check("category").notEmpty(),
    check("title").notEmpty(),
    check("amount").notEmpty(),
  ],
  spendingController.createSpending
);
router.patch(
  "/:sid",
  [
    check("category").notEmpty(),
    check("title").notEmpty(),
    check("amount").notEmpty(),
  ],
  spendingController.updateSpending
);
router.delete("/:sid", spendingController.deleteSpending);

module.exports = router;
