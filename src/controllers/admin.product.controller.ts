import productService from "@/service/product.service.js";
import type { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    // const pagination = getPagination(req.query);
    const products = await productService.getProducts();
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    // const pagination = getPagination(req.query);
    const product = await productService.getProduct({ _id: req.params.id });
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req);
    res.status(201).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id!, req);
    res.status(201).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const message = await productService.deleteProduct(req.params.id!);
    res.status(201).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
