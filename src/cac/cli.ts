import { cac } from 'cac';
import pkg from '../../package.json';
import { handleCommands } from './commands';

export const bootstrap = () => {
  const cli = cac('cover-cli');
  cli.version(pkg.version);
  handleCommands(cli);
  cli.help();
  cli.parse(process.argv);
};
