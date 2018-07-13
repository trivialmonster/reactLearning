const path = require('path');
const config = require('./config');

module.exports = {
  entry: {
    vendor: [
      // 'babel-polyfill',
      // 'axios',
      // 'react',
      // 'react-dom',
      // 'react-router',
      // 'react-router-dom',
      // 'antd'
    ],
    main: path.resolve(config.srcPath, 'index')
  },
  output: {
    publicPath: config.publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx']
    // alias: {   //  别名会导致IDE不能按ctrl + 左键连接到源文件
    //   '@@pages': path.resolve(__dirname, 'src/pages/'),
    //   '@@config': path.resolve(__dirname, 'src/config/'),
    //   '@@containers': path.resolve(__dirname, 'src/containers/'),
    //   '@@components': path.resolve(__dirname, 'src/components/'),
    //   '@@redux': path.resolve(__dirname, 'src/redux/')
    // }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000
          }
        }]
      }
    ]
  }
};
