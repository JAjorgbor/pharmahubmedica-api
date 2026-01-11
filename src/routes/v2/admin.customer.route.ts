import express, { Router } from "express";
import auth from "@/middlewares/auth.js";
import validate from "@/middlewares/validate.js";
import adminCustomerController from "@/controllers/admin.customer.controller.js";
import adminCustomerValidation from "@/validation/admin.customer.validation.js";

const router: Router = express.Router();

router.get(
  "/",
  auth("getUsers"),
  validate(adminCustomerValidation.getCustomers),
  adminCustomerController.getCustomers
);

router.get(
  "/non-referral-partners",
  auth("manageCustomers"),
  validate(adminCustomerValidation.getNonReferralPartners),
  adminCustomerController.getNonReferralPartners
);

router
  .route("/:userId")
  .get(
    auth("getUsers"),
    validate(adminCustomerValidation.getCustomer),
    adminCustomerController.getCustomer
  )
  .patch(
    auth("manageCustomers"),
    validate(adminCustomerValidation.updateCustomer),
    adminCustomerController.updateCustomer
  )
  .delete(
    auth("manageCustomers"),
    validate(adminCustomerValidation.deleteCustomer),
    adminCustomerController.deleteCustomer
  );

export default router;
