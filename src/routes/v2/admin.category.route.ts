import express, { Router } from "express";
import adminCategoryController from "@/controllers/admin.category.controller.js";
import auth from "@/middlewares/auth.js";

const router: Router = express.Router();

router.get("/", auth(), adminCategoryController.getCategories);

router.get("/:id", auth(), adminCategoryController.getCategoryById);

router.post("/", auth(), adminCategoryController.createCategory);

router.patch("/:id", auth(), adminCategoryController.updateCategory);

router.delete("/:id", auth(), adminCategoryController.deleteCategory);

export default router;
