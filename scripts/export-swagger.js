import fs from "fs";
import path from "path";
import { createSwaggerSpec } from "../src/docs/v2/swagger-def.ts";

// generate merged spec
const swaggerSpec = createSwaggerSpec();

// write it to a file at project root
fs.writeFileSync(
  path.resolve("swagger.json"),
  JSON.stringify(swaggerSpec, null, 2),
);

console.log("swagger.json generated ✅");
