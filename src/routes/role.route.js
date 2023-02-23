const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller");
const { roleValidator } = require("../validations/role.validation");
const { validate } = require("../middlewares/validation.middleware");

router.get("/", RoleController.index);
router.get("/:id", RoleController.find);
router.post("/", validate(roleValidator.create), RoleController.create);
router.put("/:id", validate(roleValidator.edit), RoleController.update);
router.delete("/:id", RoleController.delete);

module.exports = router;
