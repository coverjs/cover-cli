import type { CAC } from 'cac';
import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { checkCommit, getConfig } from '../utils';

export function handleCommands(cli: CAC, templatePath: string) {
  cli.command('openapi').action(async () => {
    const { generateApi: generateApiConfig } = await getConfig();
    try {
      await generateApi({
        templates: templatePath,
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
