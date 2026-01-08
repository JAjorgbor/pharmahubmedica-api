// scripts/build-netlify-functions.mjs
import { build } from "esbuild";
import { tsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";

await build({
  entryPoints: ["netlify/functions/api.ts"],
  outfile: "dist/netlify/functions/api.js",
  platform: "node",
  target: "node20",
  format: "cjs",
  bundle: true,
  sourcemap: true,
  plugins: [
    tsconfigPathsPlugin({
      tsconfig: "tsconfig.json",
    }),
  ],

  // If you truly don't care, you can remove external entirely.
  // Leaving this empty makes it more likely everything bundles and aliases resolve.
  external: [],
});

console.log("Built Netlify function: dist/netlify/functions/api.js");
