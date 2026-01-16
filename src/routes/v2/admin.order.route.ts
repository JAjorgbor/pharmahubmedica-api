import express from "express";
import validate from "@/middlewares/validate.js";
import orderValidation from "@/validation/order.validation.ts";
import orderController from "@/controllers/admin.order.controller.js";
import auth from "@/middlewares/admin-auth.js";

const router = express.Router();

router
  .route("/")
  .get(
    auth("getOrders"),
    validate(orderValidation.getOrders),
    orderController.getOrders
  );

router
  .route("/:orderId")
  .get(
    auth("getOrders"),
    validate(orderValidation.adminGetOrder),
    orderController.getOrder
  )
  .patch(
    auth("manageOrders"),
    validate(orderValidation.updateOrder),
    orderController.updateOrderStatus
  );

export default router;
