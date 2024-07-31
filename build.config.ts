import { defineBuildConfig } from "unbuild";

const enableOut = process.argv.includes("--out");

export default defineBuildConfig({
  entries: ["src/index"],
  clean: true,
  // Generates .d.ts declaration file
  declaration: true,
  sourcemap: enableOut,
  // Change outDir, default is 'dist'
  outDir: enableOut ? "out" : "dist",
  rollup: { esbuild: { target: "node18", minify: true } },
  externals: ["esbuild", "swagger-typescript-api"],
});
