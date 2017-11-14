前端代码编译步骤
===
##启动前端项目
安装nodejs，cmd进入项目目录，运行npm install & npm start
##按步骤运行以下命令
```
//打包
1. gulp pack
```
```
//将html转换为jsp
2. gulp generate-jsp
```
```
//将编译后的代码放到相应的svn目录
3. gulp push-svn <br>
```
###如果不想频繁打包可以直接用webpack --watch命令
特性
===
- 模块化开发，支持amd\cmd代码规范
- webpack打包，压缩合并css\html\js，实现页面gzip压缩
- 可使用jade\underscore模版渲染数据
- 可配置生产环境、联调环境、线上环境
- 可自由配置目录机构
- 实现热部署，浏览器自动刷新
- gulp copy命令生成页面的4个基本要素（html／jade／css／js）
- gulp自动化任务
