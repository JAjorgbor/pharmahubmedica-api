import catchAsync from "@/utils/catch-async.js";
import referralPartnerService from "@/services/referral-partner.service.js";
import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";
import type { Request, Response } from "express";

const getMyReferralProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await referralPartnerService.getReferralPartner({
    user: (req.user as any)._id,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Referral partner profile not found for this user"
    );
  }

  res.send(result);
});

const getMyReferredUsers = catchAsync(async (req: Request, res: Response) => {
  // First get the partner doc to get the ID
  const partner = await referralPartnerService.getReferralPartner({
    user: (req.user as any)._id,
  });

  if (!partner) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Referral partner profile not found"
    );
  }

  const referredUsers = await referralPartnerService.getReferredUsers(
    partner._id.toString()
  );

  res.send(referredUsers);
});

export default {
  getMyReferralProfile,
  getMyReferredUsers,
};
