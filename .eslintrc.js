module.exports = {
  root: true,
  extends: ['airbnb-base'],
  env: {
    browser: true,
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-tabs': 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'func-names': 'off',
    'no-param-reassign': 'off',
  },
};
