import express, { Router } from "express";
import adminProductController from "@/controllers/admin.product.controller.js";
import auth from "@/middlewares/auth.js";

const router: Router = express.Router();

router.get("/", auth("getInventory"), adminProductController.getProducts);

router.get("/:id", auth("getInventory"), adminProductController.getProductById);

router.post("/", auth("updateInventory"), adminProductController.createProduct);

router.patch(
  "/:id",
  auth("updateInventory"),
  adminProductController.updateProduct
);

router.delete(
  "/:id",
  auth("updateInventory"),
  adminProductController.deleteProduct
);

export default router;
