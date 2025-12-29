import express, { Router } from "express";
import adminProductController from "@/controllers/admin.product.controller.js";

const router: Router = express.Router();

router.get("/", adminProductController.getProducts);

router.get("/:id", adminProductController.getProductById);

router.post("/", adminProductController.createProduct);

router.patch("/:id", adminProductController.updateProduct);

router.delete("/:id", adminProductController.deleteProduct);

export default router;
