import Product, { type ProductDoc } from "@/models/product.model.js";
import httpStatus from "http-status";
import ApiError from "@/utils/api-error.js";
import { handleAssetUpload } from "@/utils/upload-asset.js";
import type { Request } from "express";
import { Types } from "mongoose";

const getProducts = async () => {
  try {
    const products = await Product.find();

    return products;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Unable to fetch products",
      false,
      error.stack
    );
  }
};
const createProduct = async (req: Request) => {
  try {
    const _id = new Types.ObjectId();

    let payload: ProductDoc;
    const { image, fields } = await handleAssetUpload(
      req,
      `categories/${_id}.jpg`
      //   {
      //     fields: adminCategoryValidation.createCategory,
      //     file: customValidation.imageFileSchema,
      //     requireFile: true,
      //   }
    );
    payload = { ...fields, image, _id };
    const product = await Product.create(payload);
    return product;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Unable to create product",
      false,
      error.stack
    );
  }
};

export default {
  getProducts,
  createProduct,
};
