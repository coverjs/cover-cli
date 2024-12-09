import type { UserConfig } from './types';
import { bootstrap } from './cac';

bootstrap();

export function defineConfig(options: UserConfig) {
  return options;
}
