const express = require("express");
const router = express.Router();
const InvestmentTypeController = require("../controllers/investmenttype.controller");
const {
  investmentTypeValidator,
} = require("../validations/investmenttypes.validation");
const { validate } = require("../middlewares/validation.middleware");

router.get("/", InvestmentTypeController.index);
router.get("/:id", InvestmentTypeController.find);
router.post(
  "/",
  validate(investmentTypeValidator.create),
  InvestmentTypeController.create
);
router.put(
  "/:id",
  validate(investmentTypeValidator.edit),
  InvestmentTypeController.update
);
router.delete("/:id", InvestmentTypeController.delete);

module.exports = router;
