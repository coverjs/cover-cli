import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node18',
  platform: 'node',
  bundle: true,
  clean: false,
  minify: true,
  dts: true
  // watch: true,
  // treeshake: true,
});
