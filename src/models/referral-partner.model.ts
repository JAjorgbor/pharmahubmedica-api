import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const referralPartnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PortalUser",
      required: true,
    },
    referralCode: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    profession: {
      type: String,
      enum: [
        "doctor",
        "nurse",
        "pharmacist",
        "chemist",
        "lab technician",
        "other",
      ],
      default: "other",
    },
  },
  { timestamps: true }
);

export type ReferralPartnerType = InferSchemaType<typeof referralPartnerSchema>;
export type ReferralPartnerDoc = HydratedDocument<ReferralPartnerType>;

const ReferralPartner = mongoose.model(
  "ReferralPartner",
  referralPartnerSchema
);

export default ReferralPartner;
