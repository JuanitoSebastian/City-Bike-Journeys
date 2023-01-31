module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:cypress/recommended'],
  plugins: [
    'svelte3',
    '@typescript-eslint',
    'cypress'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  settings: {
    'svelte3/typescript': () => require('typescript'), 
    'svelte3/typescript': true,
  }
};