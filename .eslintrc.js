module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base',
    'plugin:prettier/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'prettier'
  ],
  rules: {
    'linebreak-style': 0,
    'prettier/prettier': 'error'
  },
};
