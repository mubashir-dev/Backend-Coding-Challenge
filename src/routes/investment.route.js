const express = require("express");
const router = express.Router();
const InvestmentController = require("../controllers/investment.controller");
const { investmentValidator } = require("../validations/investment.validation");
const { validate } = require("../middlewares/validation.middleware");

router.get("/", InvestmentController.index);
router.get("/:id", InvestmentController.find);
router.get("/status/:id", InvestmentController.status);
router.post(
  "/",
  validate(investmentValidator.store),
  InvestmentController.create
);
router.put(
  "/:id",
  validate(investmentValidator.update),
  InvestmentController.update
);
router.delete("/:id", InvestmentController.delete);

module.exports = router;
