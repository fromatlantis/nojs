const {
  resolve
} = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

const srcDir = resolve(process.cwd(),'src')

var entries = (function(){
  var map = {}
  var entryFiles = glob.sync(srcDir + '/*.js')
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('src') + 4, filePath.lastIndexOf('.'));
    map[filename] = filePath;
  })
  return map;
}()) 

var rewrites = [];
var plugins = function(){
  var entryHtml = glob.sync(srcDir + '/*.html')
  var r = []
  entryHtml.forEach(function(filePath){
    var filepath = filePath.substring(filePath.lastIndexOf('src') + 4, filePath.lastIndexOf('.'))
    //console.log(filepath)
    var conf = {
      template: filePath,
      filename: filepath + '.html'
    }
    if(filepath in entries) {
      //conf.inject = 'body';
      conf.chunks = ['vendor','manifest',filepath]
      //conf.chunksSortMode = 'dependency';
    }
    r.push(new HtmlWebpackPlugin(conf))
    var item =  { from: new RegExp('^\/' + filepath), to: '/assets/' + filepath + '.html' }
    rewrites.push(item);
  })
  return r
}()

module.exports = (options = {}) => ({
  entry: entries,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','manifest'] //注意manifest确保vender hash值不再变化
    }),
  ].concat(plugins),
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  externals: {
    "BMap": "BMap" 
  }, 
  devServer: {
    //host: '127.0.0.1',
    port: 8010,
    //contentBase: resolve(__dirname, "dist"),  //热更新不会起作用
    proxy: {
      '/apis': {
        target: 'http://127.0.0.1:3100',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '/apis'
        }
      }
    },
    historyApiFallback: { //静态页面
       rewrites: rewrites,
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})