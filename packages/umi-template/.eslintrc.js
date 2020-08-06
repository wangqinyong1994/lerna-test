module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
  },
  rules: {
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-new': 'off',
    'react/no-array-index-key': 'off',
    'no-empty': 'off',
    'no-underscore-dangle': 'off',
    'no-lonely-if': 'off',
    'arrow-parens': 'off',
    'prefer-destructuring': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
  },
};
