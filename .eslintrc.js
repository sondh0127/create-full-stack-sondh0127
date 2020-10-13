module.exports = {
  extends: 'eslint-config-create-full-stack',
  rules: {
    // Include .prettierrc.js rules
    'prettier/prettier': ['error', {}, {usePrettierrc: true}], // Use our .prettierrc file as source

    // "simple-import-sort/sort": "error",

    'react/prop-types': 'off',

    /* @typescript-eslint */
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
