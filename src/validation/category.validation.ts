import customValidation from "@/validation/custom.validation.js";
import z from "zod";

const createCategory = z.object({
  name: customValidation.required(z.string(), "Category name is required"),
  description: customValidation.required(z.string(), "Description is required"),
  visible: customValidation.required(z.boolean(), "Visible is required"),
  subcategories: customValidation.required(
    z.array(
      z.object({ name: z.string({ error: "Subcategory name is required" }) })
    ),
    "Subcategories are required"
  ),
});

const updateCategory = z.object({
  name: customValidation.required(z.string(), "Category name is required"),
  description: customValidation.required(z.string(), "Description is required"),
  visible: customValidation.required(z.boolean(), "Visible is required"),
  subcategories: customValidation.required(
    z.array(
      z.object({ name: z.string({ error: "Subcategory name is required" }) })
    ),
    "Subcategories are required"
  ),
});

export default {
  createCategory,
  updateCategory,
};
