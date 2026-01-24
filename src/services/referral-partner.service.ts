import mongoose from "mongoose";
import ReferralPartner from "@/models/referral-partner.model.js";
import PortalUser from "@/models/portal.user.model.js";
import portalUserService from "@/services/portal.user.service.js";
import ApiError from "@/utils/api-error.js";
import httpStatus from "http-status";
import emailService from "@/services/email.service.js";
import roles from "@/config/roles.js";

const getReferralPartner = async (filterOptions: Object) => {
  const referralPartner = await ReferralPartner.findOne(filterOptions)
    .populate("user")
    .populate("orders")
    .populate("referralsCount");
  if (!referralPartner)
    throw new ApiError(httpStatus.NOT_FOUND, "Referral Partner not found");
  return referralPartner;
};

const getReferralPartners = async () => {
  const referralPartners = await ReferralPartner.find()
    .populate("user")
    .populate("orders")
    .populate("referralsCount");
  return referralPartners;
};

const addReferralPartner = async ({
  user,
  commissionRate,
  profession,
  accountDetails,
}: {
  user: string;
  commissionRate: number;
  profession: string;
  accountDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    bankCode: string;
  };
}) => {
  const portalUser = await portalUserService.getPortalUser({ _id: user });
  if (!portalUser)
    throw new ApiError(httpStatus.NOT_FOUND, "Portal User not found");

  if (portalUser.isReferralPartner) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User is already a referral partner",
    );
  }

  const referralPartner = await ReferralPartner.create({
    user,
    commission: { rate: commissionRate },
    profession,
    accountDetails,
  });
  portalUser.isReferralPartner = true;
  await portalUser.save();
  await emailService.notifyAddedReferralPartner({
    toEmail: portalUser.email,
    firstName: portalUser.firstName,
    professionalTitle:
      roles.referralPartnerProfessions[
        profession as keyof typeof roles.referralPartnerProfessions
      ],
  });
  return referralPartner;
};

const updateReferralPartner = async ({
  _id,
  commissionRate,
  profession,
  accountDetails,
}: {
  _id: string;
  commissionRate?: number;
  profession?:
    | "doctor"
    | "nurse"
    | "pharmacist"
    | "chemist"
    | "lab technician"
    | "other";
  accountDetails?: {
    accountName?: string;
    bankName?: string;
    accountNumber?: string;
    bankCode?: string;
  };
}) => {
  const referralPartner = await ReferralPartner.findOne({
    _id,
  });

  if (!referralPartner)
    throw new ApiError(httpStatus.NOT_FOUND, "Referral Partner not found");

  if (commissionRate) referralPartner.commission!.rate = commissionRate;
  if (profession) referralPartner.profession = profession;
  if (accountDetails) {
    referralPartner.accountDetails = {
      ...referralPartner.accountDetails,
      ...accountDetails,
    };
  }

  return referralPartner.save();
};

const toggleReferralPartnerStatus = async (partnerId: string) => {
  const referralPartner = await ReferralPartner.findOne({
    _id: partnerId,
  });

  if (!referralPartner)
    throw new ApiError(httpStatus.NOT_FOUND, "Referral Partner not found");

  referralPartner.status =
    referralPartner.status === "active" ? "inactive" : "active";
  return referralPartner.save();
};

const deleteReferralPartner = async ({ _id }: { _id: string }) => {
  const referralPartner = await ReferralPartner.findOneAndDelete({
    _id,
  });
  if (!referralPartner)
    throw new ApiError(httpStatus.NOT_FOUND, "Referral Partner not found");
  const portalUser = await portalUserService.getPortalUser({
    _id: referralPartner.user.toString(),
  });
  if (portalUser) {
    portalUser.isReferralPartner = false;
    await portalUser.save();
  }

  return referralPartner;
};

const getReferredUsers = async (partnerId: string) => {
  return await await portalUserService.getPortalUsers({
    referredBy: partnerId,
  });
};

export default {
  getReferralPartner,
  getReferralPartners,
  addReferralPartner,
  updateReferralPartner,
  toggleReferralPartnerStatus,
  deleteReferralPartner,
  getReferredUsers,
};
