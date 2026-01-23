import express, { Router } from "express";
import adminUserController from "@/controllers/admin.user.controller.js";
import auth from "@/middlewares/admin-auth.js";
import validate from "@/middlewares/validate.js";
import adminUserValidation from "@/validation/admin.user.validation.js";

const router: Router = express.Router();

router.get(
  "/:id",
  auth("getAdminUsers"),
  validate(adminUserValidation.getAdminUser),
  adminUserController.getAdminUser,
);

router.patch(
  "/id",
  auth("updateAdminUserPassword"),
  validate(adminUserValidation.updateAdminUserPassword),
  adminUserController.updateAdminUserPassword,
);

export default router;
