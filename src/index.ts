#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { UserConfig } from './types';
import { getConfig } from './utils';
import { generateApi } from 'swagger-typescript-api';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bootstrap = async () => {
  const { generateApi: generateApiConfig } = await getConfig();
  generateApi({
    templates: path.resolve(__dirname, '../template'),
    output: path.resolve(process.cwd(), './src/services/http'),
    ...generateApiConfig
  });
};

bootstrap();
export const defineConfig = (options: UserConfig) => {
  return options;
};
