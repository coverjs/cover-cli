import { cac } from 'cac';
import pkg from '../../package.json';
import { handleCommands } from './commands';

export const registerCli = () => {
  const cli = cac();
  cli.version(pkg.version);
  handleCommands(cli);
  cli.help();
  cli.parse(process.argv);
};
