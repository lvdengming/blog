// 配置参考：https://zh-hans.eslint.org/docs/latest/use/getting-started

const RULE_TYPE = {
    OFF: 'off',
    WARN: 'warn',
    ERROR: 'error'
};

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: 'airbnb-base',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: [RULE_TYPE.ERROR, 4],
        'comma-dangle': [RULE_TYPE.ERROR, 'never']
    }
};
