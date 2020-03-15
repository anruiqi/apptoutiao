module.exports = {
  // 所有postcss插件
  plugins: {
    // 自动给css样式增加前缀的属性 display：flex
    autoprefixer: {},
    'posstcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']// 基准值
    }
  }
}
