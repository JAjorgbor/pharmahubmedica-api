import express from "express";
import bankController from "@/controllers/bank.controller.js";

const router = express.Router();

router.route("/").get(bankController.getBankList);
router.route("/validate-account").get(bankController.validateBankAccount);

export default router;
