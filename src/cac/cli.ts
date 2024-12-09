import { cac } from 'cac';
import pkg from '../../package.json';
import { handleCommands } from './commands';

export function bootstrap(templatePath: string) {
  const cli = cac('laky');
  cli.version(pkg.version);
  handleCommands(cli, templatePath);
  cli.help();
  cli.parse(process.argv);
}
