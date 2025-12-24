import { type CategoryDoc } from "@/models/category.model.js";
import categoryService from "@/service/category.service.js";
import type { Request, Response } from "express";

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories: CategoryDoc[] = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCategories,
  createCategory,
};
