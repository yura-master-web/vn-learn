module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module',
        allowImportExportEverywhere: false,
    },
    extends: [
        'plugin:vue/essential',
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        // 'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    plugins: ['vue', 'html'],
    // add your custom rules here
    rules: {
        'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    },
}
