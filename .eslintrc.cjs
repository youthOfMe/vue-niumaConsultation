/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 配置但引号
        semi: false, // 配置不适应分号
        printWidth: 80, // 配置每行长度最多80字符
        trailingComma: 'none', // 配置对象|数组不加最后的分号
        endOfLine: 'auto' // 配置换行符号不限制(因为win mac 不一致)
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // 配置vue组件多单词组成但是忽略index.vue
      }
    ],
    'vue/no-setup-props-destructure': ['off'] //使得props能进行解构赋值
    // 原本直接解构props会失去响应式，但是后期会开启响应式语法糖，防止报错故配置eslint
  }
}
