import fs from "fs";
import path from "path";
import util from "util";
import { createSwaggerSpec } from "../src/docs/v2/swagger-def.ts";

try {
  const swaggerSpec = createSwaggerSpec();

  fs.writeFileSync(
    path.resolve("swagger.json"),
    JSON.stringify(swaggerSpec, null, 2),
  );

  console.log("swagger.json generated ✅");
} catch (err) {
  console.error("RAW ERROR:");
  console.error(util.inspect(err, { depth: null }));
  console.error("STRINGIFIED:");
  console.error(JSON.stringify(err, null, 2));
  process.exit(1);
}

console.log("swagger.json generated ✅");
