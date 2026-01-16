import orderService from "@/services/order.service.js";
import catchAsync from "@/utils/catch-async.js";
import pick from "@/utils/pick.js";
import httpStatus from "http-status";
import { type Request, type Response } from "express";
import ApiError from "@/utils/api-error.js";

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["orderStatus", "paymentStatus", "customer"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  // Query for orders with pagination if service supports it,
  // but let's check order service again.
  const orders = await orderService.queryOrders(filter, options);
  res.status(httpStatus.OK).json({ success: true, orders });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await orderService.getOrder(orderId as string);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  res.status(httpStatus.OK).json({ success: true, order });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await orderService.updateOrder(orderId as string, req.body);
  res.status(httpStatus.OK).json({ success: true, order });
});

export default { getOrders, getOrder, updateOrderStatus };
