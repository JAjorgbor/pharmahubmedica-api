import portalUserController from "@/controllers/portal.user.controller.js";
import portalAuth from "@/middlewares/portal-auth.js";

import express, { Router } from "express";

const router: Router = express.Router();

router.get("/me", portalAuth(), portalUserController.getPortalUser);

export default router;
