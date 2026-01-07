import { z } from "zod";
import customValidation from "@/validation/custom.validation.js";

const createAccount = {
  body: z.object({
    firstName: customValidation.required(z.string(), "First name is required"),
    lastName: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    email: customValidation.email,
    phoneNumber: customValidation.required(
      z.string(),
      "Phone number is required"
    ),
    password: customValidation.required(z.string().min(8)),
    dateOfBirth: z.string().optional(),
  }),
};

const login = {
  body: z.object({
    email: customValidation.email,
    password: customValidation.required(z.string().min(6)),
  }),
};

export default {
  createAccount,
  login,
};
