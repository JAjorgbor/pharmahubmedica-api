import config from "../../config/config.js";
import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

const pkg = JSON.parse(
  String(fs.readFileSync(new URL("../../../package.json", import.meta.url))),
);

const { version } = pkg;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pharmahubmedica API Documentation",
      version: version,
      contact: {
        name: "Joshua Ajorgbor",
        url: "https://jajorgbor.vercel.app",
        email: "joshuaajorgbor@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/v2`,
        description: "Local server",
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/docs/v2/*.doc.yml"],
};

export const createSwaggerSpec = () => swaggerJsdoc(options);
