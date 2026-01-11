import { deliveryAddressSchema } from "@/models/delivery-address.model.js";
import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portal_User",
      required: true,
    },

    products: [
      {
        // dynamic ref to reference multiple different mongoose models
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],

    transaction: {
      //   ref: {
      //     type: String,
      //   },
      discountCode: {
        type: String,
      },
      discount: {
        type: Number,
      },
      deliveryFee: {
        type: Number,
      },
      cartTotal: {
        type: Number,
        required: true,
      },
      subTotal: {
        type: Number,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
        enum: [
          "direct-bank-transfer",
          "flutterwave",
          "paystack",
          "wallet-balance",
        ],
        default: "paystack",
      },
    },

    deliveryAddress: deliveryAddressSchema,

    orderStatus: {
      type: String,
      enum: ["processing", "in-transit", "cancelled", "delivered"],
      default: "processing",
      required: true,
    },
    orderAudit: {
      processedAt: {
        type: mongoose.Schema.Types.Mixed,
        default: "not-available",
      },
      inTransitAt: {
        type: mongoose.Schema.Types.Mixed,
        default: "not-available",
      },
      cancelledAt: {
        type: mongoose.Schema.Types.Mixed,
        default: "not-available",
      },
      deliveredAt: {
        type: mongoose.Schema.Types.Mixed,
        default: "not-available",
      },
    },

    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "paid", "failed", "abandoned", "reversed"],
    },
    note: {
      type: String,
    },
    trackingId: {
      type: String,
    },
    referralDetails: {
      referralPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referral_Partner",
      },
      commission: {
        rate: {
          type: Number,
        },
        rateType: {
          type: String,
          enum: ["percentage", "fixed"],
        },
        amount: {
          type: Number,
        },
        status: {
          type: String,
          enum: ["paid", "pending", "canceled"],
        },
        note: {
          type: String,
        },
      },
    },
  },
  { timestamps: true }
);

export type OrderType = InferSchemaType<typeof orderSchema>;
export type OrderDoc = HydratedDocument<OrderType>;

const Order = mongoose.model("Order", orderSchema);
