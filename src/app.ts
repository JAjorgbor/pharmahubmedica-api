import express, { type Application } from "express";
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
import config from "@/config/config.js";

const app: Application = express();

/** Explicit origins (local/dev, etc.) */
const explicitAllowedOrigins = new Set<string>([
  "http://localhost:3000",
  "http://localhost:3001",
  `http://localhost:${config.port}`,
]);

/** Allow root + any subdomain that ends with .pharmahubmedica.ng */
function isAllowedOrigin(origin: string) {
  try {
    const { hostname } = new URL(origin);

    // allow exact root domain
    if (hostname === "pharmahubmedica.ng") return true;

    // allow any subdomain *.pharmahubmedica.ng
    return hostname.endsWith(".pharmahubmedica.ng");
  } catch {
    return false;
  }
}

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

// Ensure CORS headers are present even when errors happen (incl. preflight)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (
    origin &&
    (explicitAllowedOrigins.has(origin) || isAllowedOrigin(origin))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  next();
});

// enable cors (single config used for both normal + preflight)
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (explicitAllowedOrigins.has(origin) || isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* Routes */
app.use("/v2", routes);

// Convert any thrown errors to ApiError
app.use(errorConverter);

// Send the formatted error response
app.use(errorHandler);

export default app;
