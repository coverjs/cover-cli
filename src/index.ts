import type { UserConfig } from './types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bootstrap } from './cac';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiTempPath = path.resolve(__dirname, '../template');

bootstrap(apiTempPath);

export function defineConfig(options: UserConfig) {
  return options;
}
