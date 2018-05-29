// https://eslint.org/docs/user-guide/configuring

module.exports = {
  globals: {
    $: true
  },
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // level: off, warn, error
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // 'no-param-reassign': ['error', {
    //   props: true,
    //   ignorePropertyModificationsFor: [
    //     'state', // for vuex state
    //     'acc', // for reduce accumulators
    //     'e' // for e.returnvalue
    //   ]
    // }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],

    // specify rules
    'semi': ['error', 'never'], // 要求或禁止使用分号代替 ASI
    'comma-dangle': ['error', { // 要求或禁止末尾逗号
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline',
      exports: 'only-multiline',
      functions: 'only-multiline',
    }],
    'prefer-template': 'off', // 要求使用模板字面量而非字符串连接
    'max-len': 'off', // 强制一行的最大长度
    'class-methods-use-this': 'off', // 强制类方法使用 this
    'object-curly-spacing': 'off', // 强制在大括号中使用一致的空格
    'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
    'guard-for-in': 'off', // 要求 for-in 循环中有一个 if 语句
    'radix': 'off', // 强制在parseInt()使用基数参数
    'import/prefer-default-export': 'off', // In modules with a single export, prefer default export over named export.
    'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值
    'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
    'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
    'no-unused-expressions': 'off', // 禁止出现未使用过的表达式
    'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
    'no-nested-ternary': 'off', // 禁用嵌套的三元表达式
    'no-continue': 'off', // 禁用 continue 语句
    'no-console': 'off', // 禁用 console
    'no-restricted-syntax': 'off', // 禁用特定的语法

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
