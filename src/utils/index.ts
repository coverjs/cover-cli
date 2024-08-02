import path from 'node:path';
import fs from 'node:fs';
import { UserConfig } from '../types';
import { JS_CONFIG_FILE, TS_CONFIG_FILE } from '../constants';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

export const getConfig = async (): Promise<UserConfig> => {
  const jsConfigPath = path.resolve(process.cwd(), JS_CONFIG_FILE);
  const tsConfigPath = path.resolve(process.cwd(), TS_CONFIG_FILE);
  const configPath = fs.existsSync(jsConfigPath) ? jsConfigPath : tsConfigPath;

  if (!fs.existsSync(configPath)) {
    console.log('cover.config not found');
    process.exit(1);
  }

  if (hasTsExtension(configPath)) {
    const tsCode = fs.readFileSync(configPath, {
      encoding: 'utf-8'
    });
    const jsCode = ts.transpileModule(tsCode, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext
      }
    }).outputText;
    const fileBase = `cover.timestamp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const fileNameTmp = `${fileBase}.js`;
    const fileUrl = `${pathToFileURL(fileBase)}.js`;
    fs.writeFileSync(fileNameTmp, jsCode);
    const config = await import(fileUrl).finally(() => {
      fs.unlink(fileNameTmp, () => {}); // Ignore errors
    });
    return config.default;
  } else {
    const config = await import(configPath);
    return config.default;
  }
};

export const hasTsExtension = (str: string) => {
  // 使用正则表达式进行匹配
  const regex = /\.ts$/;
  return regex.test(str);
};
