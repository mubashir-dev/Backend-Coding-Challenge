const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { userValidator } = require("../validations/user.validation");
const { validate } = require("../middlewares/validation.middleware");

router.get("/", UserController.index);
router.get("/:id", UserController.find);
router.post("/", validate(userValidator.store), UserController.create);
router.put("/:id", validate(userValidator.update), UserController.update);
router.get("/status/:id", UserController.status);
router.put(
  "/change-password/:id",
  validate(userValidator.updatePassword),
  UserController.changePassword
);
router.delete("/:id", UserController.delete);

module.exports = router;
