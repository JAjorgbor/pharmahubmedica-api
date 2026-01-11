import express, { Router } from "express";
import portalAuth from "@/middlewares/portal-auth.js";
import portalReferralController from "@/controllers/portal.referral.controller.js";

const router: Router = express.Router();

router.use(portalAuth());

router.get("/profile", portalReferralController.getMyReferralProfile);
router.get("/referred-users", portalReferralController.getMyReferredUsers);

export default router;
