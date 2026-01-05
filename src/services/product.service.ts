import Product, { type ProductDoc } from "@/models/product.model.js";
import categoryService from "@/services/category.service.js";
import ApiError from "@/utils/api-error.js";
import type { PaginationResult } from "@/utils/pagination.js";
import { handleAssetUpload } from "@/utils/upload-asset.js";
import customValidation from "@/validation/custom.validation.js";
import productValidation from "@/validation/product.validation.js";
import type { Request } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";

const getProduct = async (filterOptions: any) => {
  try {
    const product = await Product.findOne(filterOptions)
      .populate("category")
      .populate("subcategory");

    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }
    return product;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Unable to fetch product",
      false,
      error.stack
    );
  }
};

const getProducts = async () => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");

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

const getVisibleProductsForCategory = async (
  categoryId: string,
  pagination: PaginationResult
) => {
  try {
    const { limit, skip, getPaginationMeta } = pagination;
    const products = await Product.find({
      visible: true,
      category: categoryId,
    })
      .populate("category")
      .populate("subcategory")
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments({
      visible: true,
      category: categoryId,
    });

    const meta = getPaginationMeta(total, products.length);

    return { products, meta };
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
      `products/${_id}.jpg`,
      {
        fields: productValidation.createProduct,
        file: customValidation.imageFileSchema,
        requireFile: true,
        callback: async (parsedFields) => {
          const category = await categoryService.getCategory({
            _id: parsedFields.category,
          });

          if (
            !category.subcategories.find(
              (each) => each._id == parsedFields.subcategory
            )
          ) {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              `Selected subcategory does not belong to ${category.name}`
            );
          }
        },
      }
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
const updateProduct = async (productId: string, req: Request) => {
  try {
    const { image, fields } = await handleAssetUpload(
      req,
      `products/${productId}.jpg`,
      {
        fields: productValidation.updateProduct,
        file: customValidation.imageFileSchema,
        requireFile: true,
        callback: async (parsedFields) => {
          const category = await categoryService.getCategory({
            _id: parsedFields.category,
          });

          if (
            !category.subcategories.find(
              (each) => each._id == parsedFields.subcategory
            )
          ) {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              `Selected subcategory does not belong to ${category.name}`
            );
          }
        },
      }
    );

    let payload: ProductDoc = { ...fields, image };

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");

    product.set(payload);

    await product.save();

    return product;
  } catch (error: any) {
    if (error instanceof ApiError) {
      // re-throw known ApiErrors without wrapping
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Unable to update category",
      false,
      error.stack
    );
  }
};

const deleteProduct = async (id: string) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");

    await product.deleteOne();

    return "Product deleted successfully";
  } catch (error: any) {
    if (error instanceof ApiError) {
      // re-throw known ApiErrors without wrapping
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Unable to delete product",
      false,
      error.stack
    );
  }
};

export default {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  getVisibleProductsForCategory,
  deleteProduct,
};
