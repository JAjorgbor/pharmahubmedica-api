import Order from "@/models/order.model.js";
import Product from "@/models/product.model.js";
import deliveryAddressService from "@/services/delivery-address.service.js";
import deliveryMethodService from "@/services/delivery-method.service.js";
import portalUserService from "@/services/portal.user.service.js";
import referralPartnerService from "@/services/referral-partner.service.js";
import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";

const createOrder = async ({
  customer,
  items,
  deliveryAddress,
  deliveryMethod,
}: {
  customer: string;
  items: { productId: string; quantity: number }[];
  deliveryAddress: string;
  deliveryMethod: string;
}) => {
  const portalUser = await portalUserService.getPortalUser({ _id: customer });
  if (!portalUser)
    throw new ApiError(httpStatus.NOT_FOUND, "Portal User not found");

  const referralPartner = await referralPartnerService.getReferralPartner({
    _id: portalUser.referredBy,
  });

  const deliveryAddressDetails =
    await deliveryAddressService.getDeliveryAddressById(
      portalUser._id.toString(),
      deliveryAddress
    );
  if (!deliveryAddressDetails)
    throw new ApiError(httpStatus.NOT_FOUND, "Delivery Address not found");

  const deliveryMethodDetails = await deliveryMethodService.getDeliveryMethod({
    _id: deliveryMethod,
  });
  if (!deliveryMethodDetails)
    throw new ApiError(httpStatus.NOT_FOUND, "Delivery Method not found");
  const fetchedProducts = await Product.find({
    _id: { $in: items.map((item) => item.productId) },
  });

  if (fetchedProducts.length !== items.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "Some products not found");
  }
  const totalAmount = items.reduce(
    (total, item) =>
      total +
      fetchedProducts.find(
        (product) => product._id.toString() === item.productId
      )!.price *
        item.quantity,
    0
  );
  const normalizedItems = items.map((item) => {
    const thisProduct = fetchedProducts.find(
      (product) => product._id.toString() === item.productId
    );
    return {
      productId: thisProduct?._id,
      quantity: item.quantity,
      price: thisProduct?.price,
      amount: thisProduct!.price * item.quantity,
      productName: thisProduct?.name,
    };
  });

  let referralDetails = {};
  if (referralPartner) {
    referralDetails = {
      referralPartner: referralPartner?._id,
      commission: {
        rate: referralPartner?.commission!.rate,
        rateType: referralPartner?.commission!.rateType,
        amount: totalAmount * (referralPartner?.commission!.rate / 100),
        status: "pending",
        note: "",
      },
    };
  }

  const order = await Order.create({
    customer,
    products: normalizedItems,
    deliveryAddress: deliveryAddressDetails,
    referralDetails,
    transaction: { totalAmount, deliveryFee: deliveryMethodDetails.fee },
    deliveryMethod: deliveryMethodDetails,
  });
  return order;
};

const getPortalUserOrders = async (portalUserId: string) => {
  const portalUser = await portalUserService.getPortalUser({
    _id: portalUserId,
  });
  if (!portalUser)
    throw new ApiError(httpStatus.NOT_FOUND, "Portal User not found");
  const orders = await Order.find({ customer: portalUser._id.toString() })
    .sort({ createdAt: -1 })
    .populate("customer", "firstName lastName email phoneNumber");
  return orders;
};

const queryOrders = async (
  filter: Record<string, any>,
  options: Record<string, any>
) => {
  const orders = await Order.find(filter)
    .sort(options.sortBy || { createdAt: -1 })
    .skip(options.page ? (options.page - 1) * options.limit : 0)
    .limit(options.limit || 10)
    .populate("customer", "firstName lastName email phoneNumber");
  return orders;
};

const updateOrder = async (
  orderId: string,
  updateBody: Record<string, any>
) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  // Update audit timestamps based on status change
  if (updateBody.orderStatus) {
    const now = new Date();
    if (updateBody.orderStatus === "processing")
      order.orderAudit!.processedAt = now;
    if (updateBody.orderStatus === "in-transit")
      order.orderAudit!.inTransitAt = now;
    if (updateBody.orderStatus === "cancelled")
      order.orderAudit!.cancelledAt = now;
    if (updateBody.orderStatus === "delivered")
      order.orderAudit!.deliveredAt = now;
  }

  Object.assign(order, updateBody);
  await order.save();
  return order;
};

const getOrder = async (orderId: string) => {
  const order = await Order.findById(orderId).populate(
    "customer",
    "firstName lastName email phoneNumber"
  );
  return order;
};

export default {
  createOrder,
  getPortalUserOrders,
  getOrder,
  queryOrders,
  updateOrder,
};
