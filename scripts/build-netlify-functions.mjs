import { build } from "esbuild";
import tsconfigPaths from "esbuild-plugin-tsconfig-paths";

await build({
  entryPoints: ["netlify/functions/api.ts"],
  outfile: "dist/netlify/functions/api.mjs",
  platform: "node",
  target: "node20",
  format: "esm",
  bundle: true,
  sourcemap: true,
  plugins: [tsconfigPaths()],
  external: [
    // Keep native deps external if needed (bcrypt can be tricky when bundled)
    "bcrypt",
    // AWS SDK is large; bundling is fine but can increase size. External is safe.
    "@aws-sdk/*",
  ],
});

console.log("Built Netlify function: dist/netlify/functions/api.mjs");
