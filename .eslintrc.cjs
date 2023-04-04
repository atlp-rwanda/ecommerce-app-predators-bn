module.exports = {
  env: {
<<<<<<< HEAD
    browser: true,
    commonjs: false,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'import',
  ],
  rules: {
    'linebreak-style': 0,
    'import/extensions': ['error', 'always', {
      js: 'always',
      jsx: 'always',
      json: 'always',
      ts: 'always',
      tsx: 'always',
    }],
  },
=======
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides:[
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    }
  ]
>>>>>>> e9b2d56 (ch(setup-continuous-integration): Update Readme file.)
};