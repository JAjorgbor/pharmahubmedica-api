import express, { Router } from "express";
import auth from "@/middlewares/auth.js";
import validate from "@/middlewares/validate.js";
import adminReferralPartnerController from "@/controllers/admin.referral-partner.controller.js";
import adminReferralPartnerValidation from "@/validation/admin.referral-partner.validation.js";

const router: Router = express.Router();

router
  .route("/")
  .get(
    auth("getReferralPartners"),
    adminReferralPartnerController.getReferralPartners
  )
  .post(
    auth("manageReferralPartners"),
    validate(adminReferralPartnerValidation.addReferralPartner),
    adminReferralPartnerController.addReferralPartner
  );

router
  .route("/:id")
  .patch(
    auth("manageReferralPartners"),
    validate(adminReferralPartnerValidation.updateReferralPartner),
    adminReferralPartnerController.updateReferralPartner
  )
  .delete(
    auth("manageReferralPartners"),
    validate(adminReferralPartnerValidation.deleteReferralPartner),
    adminReferralPartnerController.deleteReferralPartner
  );

router.get(
  "/detail/:partnerId",
  auth("getReferralPartners"),
  validate(adminReferralPartnerValidation.getReferralPartner),
  adminReferralPartnerController.getReferralPartner
);

router.patch(
  "/toggle-status/:id",
  auth("manageReferralPartners"),
  validate(adminReferralPartnerValidation.togglePartnerStatus),
  adminReferralPartnerController.togglePartnerStatus
);

export default router;
