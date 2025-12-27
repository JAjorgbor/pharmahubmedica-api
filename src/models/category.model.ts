import config from "@/config/config.js";
import generateUniqueSlug from "@/utils/generate-unique-slug.js";
import r2 from "@/utils/r2-client.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";
import slugify from "slugify";

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
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subcategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDoc = HydratedDocument<Category>;

categorySchema.pre("validate", async function () {
  if (this.isModified("name")) {
    const baseSlug = (slugify as any)(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    this.slug = await generateUniqueSlug(
      mongoose.model("Category"),
      baseSlug,
      this._id.toString()
    );
  }
});

categorySchema.pre(
  "deleteOne",
  { document: true },
  async function (this: CategoryDoc) {
    if (!this.image?.key) return;
    await r2.send(
      new DeleteObjectCommand({
        Bucket: config.r2.bucket!,
        Key: this.image.key,
      })
    );
  }
);

const Category = mongoose.model<Category>("Category", categorySchema);

export default Category;
