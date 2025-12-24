import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
      default: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export type Product = InferSchemaType<typeof productSchema>;
export type ProductDoc = HydratedDocument<Product>;

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;
