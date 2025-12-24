import Category, { type CategoryDoc } from "@/models/category.model.js";
import { handleAssetUpload } from "@/utils/upload-asset.js";
import type { Request, Response } from "express";
import { Types } from "mongoose";

const getCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error: any) {
    return error;
  }
};
const getVisibleCategories = async () => {
  try {
    const categories = await Category.find({ visible: true });
    return categories;
  } catch (error: any) {
    return error;
  }
};

const createCategory = async (req: Request) => {
  try {
    const _id = new Types.ObjectId();
    let payload: CategoryDoc;
    const { image, fields } = await handleAssetUpload(
      req,
      `categories/${_id}.jpg`
    );
    req.body.image = image;
    payload = { ...fields, image, _id };
    const category = await Category.create(payload);
    console.log(category);
    return category;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export default {
  createCategory,
  getCategories,
  getVisibleCategories,
};
