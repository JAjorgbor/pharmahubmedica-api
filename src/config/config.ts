import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const envVarsSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  PORT: z.coerce.number().default(5500),
  DATABASE_NAME: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.coerce.number().default(10),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.number().default(10),
  JWT_VERIFY_OTP_EXPIRATION_MINUTES: z.coerce.number().default(10),
  JWT_UPDATE_EMAIL_EXPIRATION_MINUTES: z.coerce.number().default(10),
  R2_BUCKET: z.string(),
  R2_ACCESS_KEY: z.string(),
  R2_SECRET_KEY: z.string(),
  R2_ENDPOINT: z.string(),
  R2_PUBLIC_URL: z.string(),
  //   SMTP_HOST: z.string(),
  //   SMTP_PORT: z.coerce.number(),
  //   EMAIL_FROM: z.string(),
  //   SMTP_USERNAME: z.string(),
  //   SMTP_PASSWORD: z.string(),
  //   GOOGLE_SERVICE_ACCOUNT: z.string(),
});

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const envVars = envVarsSchema.safeParse(process.env);

if (!envVars.success) {
  throw new Error(`Config validation error: ${envVars.error.message}`);
}

export default {
  env: envVars.data.NODE_ENV,
  port: envVars.data.PORT,
  mongoose: {
    url:
      envVars.data.DATABASE_URL +
      (envVars.data.NODE_ENV === "test" ? "-test" : ""),
    options: {
      dbName: envVars.data.DATABASE_NAME,
    },
  },
  jwt: {
    secret: envVars.data.JWT_SECRET,
    accessExpirationMinutes: envVars.data.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.data.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.data.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes:
      envVars.data.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    verifyOTPExpirationMinutes: envVars.data.JWT_VERIFY_OTP_EXPIRATION_MINUTES,
    updateEmailExpirationMinutes:
      envVars.data.JWT_UPDATE_EMAIL_EXPIRATION_MINUTES,
  },
  r2: {
    bucket: envVars.data.R2_BUCKET,
    accessKey: envVars.data.R2_ACCESS_KEY,
    secretKey: envVars.data.R2_SECRET_KEY,
    endpoint: envVars.data.R2_ENDPOINT,
    publicUrl: envVars.data.R2_PUBLIC_URL,
  },
  //   email: {
  //     smtp: {
  //       host: envVars.SMTP_HOST,
  //       port: envVars.SMTP_PORT,
  //       auth: {
  //         user: envVars.SMTP_USERNAME,
  //         pass: envVars.SMTP_PASSWORD,
  //       },
  //     },
  //     from: envVars.EMAIL_FROM,
  //   },
};
