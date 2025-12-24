import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { _id: true } // optional, true by default
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
    visible: {
      type: Boolean,
      required: true,
      default: true,
    },
    subcategories: {
      type: [SubcategorySchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDoc = HydratedDocument<Category>;

const Category = mongoose.model<Category>("Category", categorySchema);

export default Category;
