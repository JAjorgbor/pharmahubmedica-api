import referralPartnerService from "@/services/referral-partner.service.js";
import ApiError from "@/utils/api-error.js";
import catchAsync from "@/utils/catch-async.js";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import portalUserService from "@/services/portal.user.service.js";
import orderService from "@/services/order.service.js";

const getReferralPartnerDetails = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.portalUser._id.toString();

    const partner = await referralPartnerService.getReferralPartner({
      user: userId,
    });
    if (!partner) {
      throw new ApiError(httpStatus.NOT_FOUND, "Referral partner not found");
    }
    res.status(httpStatus.OK).json({ partner });
  },
);

const updateReferralPartnerDetails = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.portalUser._id.toString();

    const partner = await referralPartnerService.getReferralPartner({
      user: userId,
    });
    if (!partner) {
      throw new ApiError(httpStatus.NOT_FOUND, "Referral partner not found");
    }
    const result = await referralPartnerService.updateReferralPartner({
      _id: partner._id.toString(),
      ...req.body,
    });
    res.send({ partner: result });
  },
);

const getReferrals = catchAsync(async (req: Request, res: Response) => {
  const userId = req.portalUser._id.toString();
  const result = await portalUserService.getPortalUsers({
    referredBy: userId,
  });
  res.status(httpStatus.OK).json({ referrals: result });
});

const getReferredUserOrders = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.portalUser._id.toString();
    const result = await orderService.getPortalUserOrders(userId);
    res.status(httpStatus.OK).json({ orders: result });
  },
);

const getReferredUserDetails = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await portalUserService.getPortalUser({ _id: userId! });
    if (!result) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    res.status(httpStatus.OK).json({ user: result });
  },
);

export default {
  getReferralPartnerDetails,
  updateReferralPartnerDetails,
  getReferrals,
  getReferredUserOrders,
  getReferredUserDetails,
};
