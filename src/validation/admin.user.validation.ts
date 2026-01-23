import { z } from "zod";
import customValidation from "@/validation/custom.validation.js";

const getAdminUser = {
  params: z.object({
    id: customValidation.required(z.string(), "Admin user ID is required"),
  }),
};

const updateAdminUserPassword = {
  params: z.object({
    id: customValidation.required(z.string(), "Admin user ID is required"),
  }),
  body: z.object({
    oldPassword: customValidation.required(
      z.string(),
      "Old password is required",
    ),
    newPassword: customValidation.required(
      z.string().min(6),
      "New password must be at least 6 characters",
    ),
  }),
};

export default {
  getAdminUser,
  updateAdminUserPassword,
};
