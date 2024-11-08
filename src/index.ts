import { registerCli } from './cac';
import { UserConfig } from './types';

registerCli();

export const defineConfig = (options: UserConfig) => {
  return options;
};
