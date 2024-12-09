import linter from '@lakyjs/eslint-config/cli';

export default linter({
  typescript: true,
  yaml: true,
  rules: {
    'unused-imports/no-unused-imports': 2,
    'node/prefer-global/buffer': 0,
    'node/prefer-global/process': [0, 'never'],
  }
});
