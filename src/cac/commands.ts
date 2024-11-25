import type { CAC } from 'cac';
import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { checkCommit, getConfig } from '../utils';
import { fileURLToPath } from 'node:url';

export const handleCommands = (cli: CAC) => {
  cli.command('openapi').action(async () => {
    const { generateApi: generateApiConfig } = await getConfig();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
      await generateApi({
        templates: path.resolve(__dirname, '../template'),
        output: path.resolve(process.cwd(), './src/services'),
        silent: true,
        ...generateApiConfig
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('Api 生成成功~');
  });

  cli
    .command('check')
    .option('--commit-msg', '校验git提交信息')
    .action(async (options) => {
      if (options.commitMsg) checkCommit();
    });
};
