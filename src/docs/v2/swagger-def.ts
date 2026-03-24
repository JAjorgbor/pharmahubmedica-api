import config from "@/config/config.js";
import swaggerJsdoc from "swagger-jsdoc";
import pkg from "../../../package.json" with { type: "json" };

import path from "path";

const { version } = pkg;
const isNetlify = process.env.NETLIFY === "true";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pharmahubmedica API Documentation",
      version: version,
      // description: 'Pharmahubmedica API Documentation',
      contact: {
        name: "Joshua Ajorgbor",
        url: "https://jajorgbor.vercel.app",
        email: "joshuaajorgbor@gmail.com",
      },
    },
    servers: [
      isNetlify
        ? {
            url: "/.netlify/functions/api",
            description: "Netlify Production",
          }
        : {
            url: `http://localhost:${config.port}/v2`,
            description: "Local server",
          },
      // {
      //   url: `https://api-sandbox.pharmahubmedica.ng/v2`,
      //   description: "Sandbox server",
      // },
    ],
  },
  apis: [
    path.resolve("src/routes/**/*.ts"),
    path.resolve("src/docs/v2/*.doc.yml"),
  ],
};

export const createSwaggerSpec = () => swaggerJsdoc(options);
