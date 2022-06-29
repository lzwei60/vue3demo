module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    //parser: '@babel/eslint-parser'
  },
  plugins: [
    'vue',
    //'@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 允许非空断言
    '@typescript-eslint/no-unused-vars': 'error',
    // 允许自定义模块和命名空间
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 允许对this设置alias
    '@typescript-eslint/no-this-alias': 'off',
    // 允许使用any类型
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-inferrable-types': 'off'
  }
}
