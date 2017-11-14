
'use strict';
var path = require('path');
var fs=require('fs');
var glob = require('glob');
var gulp = require('gulp')
var changed = require('gulp-changed')
var watch = require('gulp-watch')
var webpack = require('webpack')

var gutil = require('gulp-util')

var webpackConf = require('./webpack.config')
var webpackLibConf = require('./webpack.lib.config')

var config = require('./config.json')

var src = path.resolve(process.cwd(), config.devPath);
var assets = path.resolve(process.cwd(), config.buildPath);

gulp.task('new', () => {
    var page=gulp.env.page;
    if(page){
        var _elements=path.resolve(process.cwd()+'/public','_elements');
        var targetPath=path.resolve(src,page);
        var html=path.resolve(targetPath, 'index.html');
        fs.exists(html, function (exists) {
            if(exists){
                console.log('请勿重复创建');
            }else{
                gulp.src(_elements + '/**')
                    .pipe(gulp.dest(targetPath))
            }
        })
    }else{
        console.log('请输入--page参数');   
    }
})
// js check
gulp.task('hint', () => {
    var jshint = require('gulp-jshint')
    var stylish = require('jshint-stylish')

    return gulp.src([
            '!' + src + '/javascripts/lib/**/*.js',
            src + '/javascripts/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
})

// clean assets
//gulp.task('clean', ['hint'], () => {
gulp.task('clean', () => {
    var clean = require('gulp-clean')

    return gulp.src(assets, {read: true}).pipe(clean())
})

// run webpack pack
gulp.task('pack', ['clean'], (done) => {
    webpack(webpackConf, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({colors: true}))
        done()
        /**
        //以下为特殊定制，处理publicPath为相对路径，且css中引用图片，无法访问的BUG
        if(!config.online){
            gulp.src(assets + '/fonts/**')
                .pipe(gulp.dest(assets+'/stylesheets/fonts'))
        }
        **/
    })
})

gulp.task('pack-lib', () => {
    var name=gulp.env.name;
    if(name){
        webpack(webpackLibConf({name:name}), (err, stats) => {
            if(err) throw new gutil.PluginError('webpack', err)
            gutil.log('[webpack]', stats.toString({colors: true}))
        })
    }else{
         console.log('请输入--name参数');   
    }
})

// html process
/*gulp.task('default', ['pack'], () => {
    let replace = require('gulp-replace')
    let htmlmin = require('gulp-htmlmin')

    return gulp
        .src(assets + '/*.html')
        // @see https://github.com/kangax/html-minifier
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(assets))
})*/

//生成jsp，除非修改了html页面，否则不用重新生成
gulp.task('generate-jsp',() => {
    fs.readFile('./header.jsp',function(err,data){
        if(err) throw err;
        var header=data.toString();
        var entryHtml = glob.sync(assets + '/*.html')
        var total=entryHtml.length;
        console.log('一共有'+total+'个页面');
        var i = 0;
        entryHtml.forEach(function(filePath) {
            var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            var jspRoot = filePath.substring(0,filePath.lastIndexOf('\/') + 1);
            fs.readFile(filePath,function(err,data){
                if(err) throw err;
                //console.log(data.toString());
                var content=data.toString();
                fs.writeFile(jspRoot + filename + '.jsp',header + content,function(err){
                    if(err) throw err;
                    i++;
                    console.log('生成'+filename+'.jsp完成，进度'+i+'/'+total);
                })
            })
        })
    })
})

gulp.task('push-svn',() => {
    //编译后的代码存放至local SVN
    if(config.online){
        var _views = 'F:/surveyRpt/trunk/WebRoot/WEB-INF/source';
        var _static = 'F:/surveyRpt/trunk/WebRoot/static';
        var _dev = 'F:/surveyRpt/trunk/WebRoot/dev';
        gulp.src(assets + '/*.jsp')
            .pipe(changed(_views))
            .pipe(gulp.dest(_views))
        gulp.src([
                '!'+assets + '/*.html',
                '!'+assets + '/*.jsp',
                assets + '/**'
            ])
            .pipe(changed(_static))
            .pipe(gulp.dest(_static))
        /*
        return gulp.watch(assets + '/**',function(){
            gulp.src(assets + '/**')
            .pipe(changed(dist))
            .pipe(gulp.dest(dist))
        })
        */
        /**如果在svn源代码上开发，则不需要
        //源文件代码
        gulp.src([
                '!'+assets+'/**',
                '!bower_components/**',
                '!node_modules/**',
                './**'
            ])
            .pipe(changed(_dev))
            .pipe(gulp.dest(_dev))
        **/
    }else{
        console.log('请配置online:true');
    }
})
// deploy assets to remote server
gulp.task('deploy', () => {
    var sftp = require('gulp-sftp')
    return gulp.src(assets + '/**')
        .pipe(sftp(config.online?config.onServer.sftp:config.testServer.sftp))
})

