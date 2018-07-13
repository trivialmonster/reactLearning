const webpack = require('webpack');
const os = require('os');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const merge = require('webpack-merge');     //  webpack配置文件合并
const config = require('./config');
const webpackConfig = require('./webpack.base.config');

const publicPath = config.publicPath;
const IP = getIPAdress();   // 本机的IP地址
const PORT = 9007;          // 端口号

module.exports = merge(webpackConfig, {
  mode: 'development',         //  提供模式配置选项告诉WebPACK使用其内置的优化
  // devtool: 'eval',          //  比source-map编译快
  devtool: 'source-map',
  devServer: {
    host: IP,     //  使用IP地址代替默认的localhost，方便手机访问
    port: PORT,   //  同上
    // contentBase: path.join(__dirname, '../src'),       //  告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    historyApiFallback: true,                         //  HTML5 History API 404 响应
    compress: false,                                  //  是否开启Gzip
    disableHostCheck: true,
    proxy: {                                          //  开启代理服务器，开发时连接接口
      '/api/': {
        target: 'http://172.16.10.64',
        secure: false
      }
    },
    stats: {                                          //  控制命令行输出的内容
      timings: true,  // 增加时间信息
      version: true,  // 增加 webpack 版本信息
      publicPath: true, // 增加 public path 的信息
      assets: true, // 增加资源信息
      assetsSort: 'field',   // 对资源按指定的项进行排序，你可以使用 `!field` 来反转排序。
      children: false,  // 子级的信息
      chunks: false,  // 包信息（设置为 `false` 能允许较少的冗长输出）
      modules: false, // 增加内置的模块信息
      errors: true, // 错误信息
      errorDetails: true, // 增加错误的详细信息（就像解析日志一样）
      warnings: false  // 警告信息
    },
    inline: true,                                     //  开启webpack原生的热更新
    hot: true                                         //  开启webpack原生的热更新
  },
  output: {
    filename: '[name].js'
    // filename: 'bundle.js'  //  会报错，显示不唯一
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),                       //  热更新时方便调试
    new webpack.HotModuleReplacementPlugin(),               //  开启webpack原生的热更新
    new HtmlWebpackPlugin({
      template: path.resolve(config.srcPath, 'index.html'),
      inject: true  //  true的话就说明是开发版本，会自动引入css和js文件
    }),
    new OpenBrowserPlugin({
      url: 'http://' + IP + ':' + PORT + publicPath
    })
  ]
});

function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
