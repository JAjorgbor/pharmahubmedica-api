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
    transaction: { totalAmount, deliveryFee: 2000 },
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
  const orders = await Order.find({ customer: portalUser._id.toString() });
  return orders;
};

const getOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  return order;
};

export default { createOrder, getPortalUserOrders, getOrder };
