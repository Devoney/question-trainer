const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ],
}