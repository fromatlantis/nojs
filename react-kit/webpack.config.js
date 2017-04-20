const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const publicPath = ''
module.exports = (options = {}) => ({
  devtool: 'source-map',
  entry: {
    index: './src/main.jsx'
    /**
    index: [
      'webpack/hot/dev-server','./src/main.js'
    ]
    **/
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[hash]', //上线时去掉HotModuleReplacementPlugin，改为chunkhash
    chunkFilename: '[id].js?[hash]',
    publicPath: options.dev ? '/assets/' : publicPath //热更新必须配置，否则热更新无效
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['index','manifest']//注意manifest的作用
    })
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /favicon\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  devServer: {
      host: '127.0.0.1',
      port: 8010,
      historyApiFallback: { //静态页面
        rewrites: [
          // shows views/landing.html as the landing page
          { from: /^\/$/, to: '/assets/index.html' }
        ],
      }
  }
})
/**
 * js用的是webpack的chunkhash，而css用的是contenthash，contenthash是根据内容生成的hash。
 * 如果不用contenthash，那么一改js，css的版本号也会跟着改变，这个就有问题了。
 * webpack还有另外一个自带的叫做”[hash]”，这个hash是所有文件都用的同一个哈希，也就是说某个文件改了，所有文件的版本号都会跟着改，所以一般不用这个。
 */
