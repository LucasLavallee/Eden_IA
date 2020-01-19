const { join } = require('path')

module.exports = {
  lintOnSave: false,

  devServer: {
    disableHostCheck: true
  },

  configureWebpack: {
    resolve: {
      alias: {
        utils: join(__dirname, 'src/utils'),
        objects: join(__dirname, 'src/webgl/objects')
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.(txt|glsl|frag|vert|fs|vs|cur)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()

    config.module
      .rule('glsl')
      .test(/\.(glsl|frag|vert|fs|vs)$/)
      .use('glslify')
      .loader('glslify-loader')
      .end()
  }
}
