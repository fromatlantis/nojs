'use strict';

var webpack = require('webpack');
var path = require('path');
var config = require('./config.json');
//var libraryName = 'halo';

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS
var cssLoader
var sassLoader
var debug = true;
var plugins = [];

module.exports = (options) =>{
    let opts = options || {};
    var libraryName = opts.name;
    var serverMap = {
        local:'/library/dist/'+libraryName+'/',
        test:'http://21.32.95.248:8088/bhoserver/resources/static/js/bho/'+libraryName+'/',
        online:'http://21.32.3.162:80/bhoserver/resources/static/js/bho/'+libraryName+'/',
    }
    var librarySrc =  path.resolve(config.libPath + '/src', libraryName);//绝对路径
    var libraryPath =  path.resolve(config.libPath + '/dist', libraryName);//绝对路径
    var outputFile = libraryName + '.js?[hash:8]';
    var publicPath = serverMap['online'];//虚拟资源路径，跟线上环境路径一致。

    if(debug) {
        extractCSS = new ExtractTextPlugin(libraryName+'.css?[contenthash:8]')
        cssLoader = extractCSS.extract(['css'])
        sassLoader = extractCSS.extract(['css', 'sass'])
        if(config.hot){
            plugins.push(extractCSS,new webpack.HotModuleReplacementPlugin())
        }else{
            plugins.push(extractCSS)
        }
    } else {
        extractCSS = new ExtractTextPlugin(libraryName+'.css?[contenthash:8]', {
        //下面那种方式deploy的时候无法覆盖掉旧的
        //extractCSS = new ExtractTextPlugin('stylesheets/[contenthash:8].[name].min.css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
            // 第一个参数`notExtractLoader`，一般是使用style-loader
            // @see https://github.com/webpack/extract-text-webpack-plugin
            allChunks: false
        })
        cssLoader = extractCSS.extract(['css?minimize'])
        sassLoader = extractCSS.extract(['css?minimize', 'sass'])
        plugins.push(
            extractCSS,
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                mangle: {
                    except: ['$', 'exports', 'require']//混淆代码时不会被混淆
                }
            }),
            // new AssetsPlugin({
            //     filename: path.resolve(assets, 'source-map.json')
            // }),
            new webpack.optimize.DedupePlugin(),
            new webpack.NoErrorsPlugin()
        )
        plugins.push(new UglifyJsPlugin())
    }

    let packConfig = {
        entry: librarySrc + '/index.js',
        output: {
            path: libraryPath,//打包文件存放的绝对路径
            filename: outputFile,
            chunkFilename:'[name].chunk.js?[hash:8]',
            library: libraryName,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            publicPath: publicPath//网站运行时的访问路径(用于js\css\images打包到页面上的路径)
        },
        resolve: {
            root: [path.resolve(process.cwd(), 'public')],
            alias: config.alias,
            extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg']
        },
        plugins: [new webpack.ProvidePlugin({
                    "moment": "moment"
                })].concat(plugins),
        externals: {
            'jquery':'$'//以<script>的形式挂在到页面上来加载
        },
        module: {
            loaders: [
                {
                    test: /\.(jpe?g|png|gif|ico)$/,
                    loaders: [
                         // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        'url?limit=1&name=images/[name].[ext]?[hash:8]',
                        //下面那种方式deploy的时候无法覆盖掉旧的
                        //'url?limit=10000&name=images/[hash:8].[name].[ext]',
                        //'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}' //低版本node\npm会报错
                    ]
                },
                {
                    test: /\.((ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|svg|woff)$/,
                    loader: 'url?limit=1&name=fonts/[name].[ext]?[hash:8]'
                    //loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                },
                {test: /\.css$/, loader: cssLoader},
                {test: /\.scss$/, loader: sassLoader},
                {test: /\.(tmpl|html)$/, loader: 'html-loader' },
                {test: /\.json$/, loader: 'json-loader' },
                {test: /\.jade$/, loader: 'jade-loader' }
            ]
        }
    }
    return packConfig;
}
