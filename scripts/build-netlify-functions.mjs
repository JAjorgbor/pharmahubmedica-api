import { build } from "esbuild";
import path from "node:path";
import { loadConfig, createMatchPath } from "tsconfig-paths";

function tsconfigPathsEsbuildPlugin({
  tsconfig = "tsconfig.json",
  extensions = [".ts", ".tsx", ".mts", ".js", ".jsx", ".mjs", ".cjs", ".json"],
} = {}) {
  return {
    name: "tsconfig-paths",
    setup(build) {
      const config = loadConfig(process.cwd(), tsconfig);

      if (config.resultType === "failed") {
        // Fail fast with a clear error if tsconfig can't be read/parsed
        throw new Error(
          `[tsconfig-paths] Failed to load ${tsconfig}: ${config.message}`
        );
      }

      const matchPath = createMatchPath(config.absoluteBaseUrl, config.paths);

      build.onResolve({ filter: /^[^./].*/ }, (args) => {
        // Ignore built-in Node modules (node:fs, etc.)
        if (args.path.startsWith("node:")) return;

        // Try to match TS path aliases
        const matched = matchPath(args.path, undefined, undefined, extensions);

        if (!matched) return;

        // Resolve to absolute so esbuild has a stable path
        const abs = path.isAbsolute(matched)
          ? matched
          : path.join(config.absoluteBaseUrl, matched);

        return { path: abs };
      });
    },
  };
}

await build({
  entryPoints: ["netlify/functions/api.ts"],
  outfile: "dist/netlify/functions/api.mjs",
  platform: "node",
  target: "node20",
  format: "esm",
  bundle: true,
  sourcemap: true,

  // Helps with JSON imports (including ESM-style JSON)
  loader: { ".json": "json" },

  // No special externals — let esbuild bundle everything it can
  plugins: [tsconfigPathsEsbuildPlugin()],
});

console.log("Built Netlify function: dist/netlify/functions/api.mjs");
