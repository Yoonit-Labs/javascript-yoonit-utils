module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard'
  ],
  plugins: [
    '@babel',
    'jest'
  ],
  globals: {
    arguments: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    babelOptions: {
      rootMode: 'upward'
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-debugger': 'off',
    'no-console': 'off',
    'no-case-declarations': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/require-default-prop': 'off',
    indent: ['error', 2],
    'one-var': [
      'error',
      {
        var: 'never',
        let: 'never',
        const: 'never'
      }
    ],
    semi: [2, 'never'],
    'arrow-parens': 0,
    'generator-star-spacing': 'off',
    'no-new': 0,
    'no-fallthrough': 'off'
  }
}
