import categoryService from "@/services/category.service.js";
import type { Request, Response } from "express";

const getCategories = async (req: Request, res: Response) => {
  try {
    // const pagination = getPagination(req.query);
    const categories = await categoryService.getCategories();
    res.status(200).json({ categories });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    // const pagination = getPagination(req.query);
    const category = await categoryService.getCategory({ _id: req.params.id });
    res.status(200).json({ category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req);
    res.status(201).json({ category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateCategory(req.params.id!, req);
    res.status(201).json({ category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const message = await categoryService.deleteCategory(req.params.id!);
    res.status(201).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
