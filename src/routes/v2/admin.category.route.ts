import express, { Router } from "express";
import adminCategoryController from "@/controllers/admin.category.controller.js";

const router: Router = express.Router();

router.get("/", adminCategoryController.getCategories);

router.get("/:id", adminCategoryController.getCategoryById);

router.post("/", adminCategoryController.createCategory);

router.patch("/:id", adminCategoryController.updateCategory);

router.delete("/:id", adminCategoryController.deleteCategory);

export default router;
