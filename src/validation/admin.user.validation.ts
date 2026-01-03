import { z } from "zod";
import customValidation from "@/validation/custom.validation.js";

const getAdminUser = {
  params: z.object({
    id: customValidation.required(z.string(), "Admin user ID is required"),
  }),
};

export default {
  getAdminUser,
};
