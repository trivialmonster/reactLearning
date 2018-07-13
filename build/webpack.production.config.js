const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');       //  清除指定文件文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');         //  拷贝指定文件或文件夹到指定路径
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //  webpack4替代extract-text-webpack-plugin提取出组件的css文件并合并成输出成一个main.css文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); //  主要用来提取出组件的css文件并合并成输出成一个main.css文件
const HtmlWebpackPlugin = require('html-webpack-plugin');         //  为html模板注入打包好的带MD5后缀静态文件
const merge = require('webpack-merge');     //  webpack配置文件合并
const config = require('./config');
const webpackConfig = require('./webpack.base.config');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   //  打包后分析包的组成，因为会起一个本地服务所以用gulp一次打包多套样式的时候不能用

const publicPath = config.publicPath;
const distPath = config.distPath;

module.exports = merge(webpackConfig, {
  mode: 'production',         //  提供模式配置选项告诉WebPACK使用其内置的优化
  output: {
    path: distPath,
    publicPath: publicPath,
    filename: '[id]_[name]_[chunkHash:8].js',
    chunkFilename: '[id]_[name]_[chunkHash:8].js'
  },
  //  压缩配置
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    //  将所有css chunk合并成一个css文件
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.less|css$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: 'css-loader',
            // options: {
            //   minimize: true
            // }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true //  antd-mobile中需要的配置
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    new CleanWebpackPlugin([distPath], {
      root: config.rootPath,
      verbose: true                                   //  开启在控制台输出信息
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), //  可以稍微减小打包的体积,聊胜于无
    new webpack.optimize.SplitChunksPlugin({
      name: true
    }),   //  拆分JS代码
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      // chunkFilename: 'css/main.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(config.srcPath, 'index.html'),
      inject: true,
      hash: true,                       //  解决css缓存问题
      chunksSortMode: 'dependency',     //  按依赖关系在html中顺序引入js文件，避免main在vendor之前引入导致的报错
      minify: {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
      }
    }),
    new CopyWebpackPlugin([       //  拷贝index.html中直接引入的，不经过webpack的静态资源);
      {
        from: path.resolve(config.srcPath, 'static/'),
        to: path.resolve(distPath, 'static')
      }
    ])
  ]
});
