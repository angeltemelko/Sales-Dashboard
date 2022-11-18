module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/reccomended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {},
};