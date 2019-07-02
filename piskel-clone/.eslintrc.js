module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "class-methods-use-this": 0,
    "no-new": 0,
    "max-len": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
  },
};
