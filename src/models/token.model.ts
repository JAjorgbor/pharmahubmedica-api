import tokenTypes from "@/config/tokens.js";
import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";
import toJSON from "@/models/plugins/toJSON.plugin.js";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "userModel",
    },
    userModel: {
      type: String,
      required: true,
      enum: ["Admin_User"],
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
        tokenTypes.UPDATE_EMAIL,
        tokenTypes.VERIFY_OTP,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.plugin(toJSON);

export type Token = InferSchemaType<typeof tokenSchema>;
export type TokenDoc = HydratedDocument<Token>;

const Token = mongoose.model("Token", tokenSchema);

export default Token;
