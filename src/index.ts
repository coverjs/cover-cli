import { bootstrap } from './cac';
import { UserConfig } from './types';

bootstrap();

export const defineConfig = (options: UserConfig) => {
  return options;
};
