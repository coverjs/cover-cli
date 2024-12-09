import { cac } from 'cac';
import pkg from '../../package.json';
import { handleCommands } from './commands';

export function bootstrap() {
  const cli = cac('laky');
  cli.version(pkg.version);
  handleCommands(cli);
  cli.help();
  cli.parse(process.argv);
}
