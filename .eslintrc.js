module.exports = {
    "root": false,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    "parserOptions": {
        "parser": 'babel-eslint'
    },
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": [2, 4]
    }
}
