import express, { Router } from "express";
import adminCategoryController from "@/controllers/admin.category.controller.js";

const router: Router = express.Router();

router.get("/", adminCategoryController.getCategories);

router.post("/", adminCategoryController.createCategory);

export default router;
