import express, { type Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import routes from "@/routes/v2/index.js";
import sanitizeXSS from "@/middlewares/sanitizeXSS.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { errorConverter, errorHandler } from "@/middlewares/error.js";
import passport from "passport";
import jwtStrategy from "@/config/passport.js";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://pharmahubmedica.ng",
  "https://sandbox.pharmahubmedica.ng",
  "https://v2.pharmahubmedica.ng",
];

/* Middleware */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(sanitizeXSS());
app.use(ExpressMongoSanitize());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// gzip compression
app.use(compression());

// enable cors
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allows cookies
  })
);
app.options(
  "*",
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* Routes */
app.use("/v2", routes);

//  Convert any thrown errors to ApiError
app.use(errorConverter);

//  Send the formatted error response
app.use(errorHandler);

export default app;
