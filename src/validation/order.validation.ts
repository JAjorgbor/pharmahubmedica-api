import { z } from "zod";

const getOrders = {
  query: z.object({
    sortBy: z.string().optional(),
    limit: z.number().int().optional(),
    page: z.number().int().optional(),
  }),
};

const getOrder = {
  params: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
    orderId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Order ID"),
  }),
};

const createOrder = {
  body: z.object({
    customer: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Customer ID"),
    items: z
      .array(
        z.object({
          productId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
          quantity: z.number().int().min(1),
        })
      )
      .min(1),
    deliveryAddress: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Address ID"),
    deliveryMethod: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Method ID"),
  }),
};

export default {
  getOrders,
  getOrder,
  createOrder,
};
