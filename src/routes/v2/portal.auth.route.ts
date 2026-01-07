import portalAuthController from "@/controllers/portal.auth.controller.js";
import portalAuth from "@/middlewares/portal-auth.js";
import validate from "@/middlewares/validate.js";
import portalAuthValidation from "@/validation/portal.auth.validation.js";
import express, { Router } from "express";

const router: Router = express.Router();

router.post(
  "/create-account",
  validate(portalAuthValidation.createAccount),
  portalAuthController.createAccount
);
router.post(
  "/login",
  validate(portalAuthValidation.login),
  portalAuthController.login
);
router.post("/logout", portalAuth(), portalAuthController.logout);
router.post("/refresh-tokens", portalAuthController.refreshTokens);

export default router;
