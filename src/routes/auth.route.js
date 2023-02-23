const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { authValidator } = require("../validations/auth.validation");
const { validate } = require("../middlewares/validation.middleware");

router.post("/login", validate(authValidator.login), AuthController.login);
router.post(
  "/refresh-token",
  validate(authValidator.refreshToken),
  AuthController.refreshToken
);
router.post(
  "/forgot-password",
  validate(authValidator.forgotPassword),
  AuthController.forgotPassword
);
router.post(
  "/forgot-password-restore/:token",
  validate(authValidator.passwordRestore),
  AuthController.forgotPasswordRestore
);

module.exports = router;
