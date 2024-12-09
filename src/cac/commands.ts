import type { CAC } from 'cac';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateApi } from 'swagger-typescript-api';
import { checkCommit, getConfig } from '../utils';

export function handleCommands(cli: CAC) {
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
    }
    catch (err) {
      console.error(err);
      process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log('Api 生成成功~');
  });

  cli
    .command('check')
    .option('--commit-msg', '校验git提交信息')
    .action(options => {
      if (options.commitMsg) {
        checkCommit();
      }
    });
}
