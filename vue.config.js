const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
   filenameHashing: true,
  // outputDir: '/opt/lampp/htdocs/msk.vevanta.com/test',
  // assetsDir:'/files',
  configureWebpack: {
    plugins: [new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),],

    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({})],
    },
  },


  runtimeCompiler: true,
  css: {
    // requireModuleExtension: false
    extract: false
  }
}
