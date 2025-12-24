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

const app: Application = express();

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

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

/* Routes */
app.use("/v2", routes);

export default app;
