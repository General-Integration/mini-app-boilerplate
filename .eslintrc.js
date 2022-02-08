module.exports = {
  globals: {
    _: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
  ],
  plugins: ['prettier'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/require-default-prop': 'off',
    'no-debugger': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
}
