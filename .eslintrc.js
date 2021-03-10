/* eslint-disable max-len,no-magic-numbers */
module.exports = {
  plugins: ['html', 'typescript', 'import'],
  env: {
    'commonjs': true,
    'browser': true,
    'es6': true,
    'amd': true,
    'node': true,
    'mocha': true,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/**/*.{spec,test,bundle}.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  'extends': ['eslint:recommended', 'plugin:vue/recommended', 'plugin:import/warnings'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/require-default-prop': 'off',
    indent: [
      'error',
      2
    ],
    'one-var': [
      'error',
      {
        var: 'never',
        let: 'never',
        const: 'never'
      }
    ],
    semi: [
      2,
      'never'
    ],
    'arrow-parens': 0,
    'generator-star-spacing': 'off',
    'no-new': 0,
    'no-fallthrough': 'off'
  }
};