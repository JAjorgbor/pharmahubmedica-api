import portalUserController from "@/controllers/portal.user.controller.js";
import portalAuth from "@/middlewares/portal-auth.js";
import validate from "@/middlewares/validate.js";
import portalUserValidation from "@/validation/portal.user.validation.js";
import express, { Router } from "express";

const router: Router = express.Router();

router.get(
  "/:id",
  portalAuth(),
  validate(portalUserValidation.getPortalUser),
  portalUserController.getPortalUser
);

export default router;
