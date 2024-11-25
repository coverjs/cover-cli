import path from 'node:path';
import fs from 'node:fs';
import { UserConfig } from '../types';
import { JS_CONFIG_FILE, TS_CONFIG_FILE } from '../constants';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import pico from 'picocolors';

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

export const checkCommit = () => {
  const msgPath = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
  const msg = fs.readFileSync(msgPath, 'utf-8').trim();
  const commitRE =
    /^(?:revert: )?(?:feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|release)(?:\(.+\))?: .{1,50}/;

  if (!commitRE.test(msg)) {
    console.log();
    console.error(
      `  ${pico.white(pico.bgRed(' ERROR '))} ${pico.red(`invalid commit message format.`)}\n\n${pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      )}    ${pico.green(`feat(system/user): add user list`)}\n` +
        `    ${pico.green(`fix(profile): handle type error (close #28)`)}\n\n${pico.red(
          `  See .github/commit-convention.md for more details.\n`
        )}`
    );
    process.exit(1);
  }
};
