import { z } from "zod";
import customValidation from "@/validation/custom.validation.js";

const getPortalUser = {
  params: z.object({
    id: customValidation.required(z.string(), "Portal user ID is required"),
  }),
};

export default {
  getPortalUser,
};
