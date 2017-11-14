var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var HTML_ROOT = path.join(__dirname,'../bin/assets/');
var routerMap={
	'/':'login.html',
	'/home':'home.html',
	'/template/find':'template.html',
	'/template/preview':'preview.html',
	'/template/upload':'upload.html',
	'/reportLoan/find':'report.html',
	'/reportLoan/upload':'upload.html'
}

/* GET home page. */
/**
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
**/

router.get('/*',function(req,res,next){
	//console.log(req.baseUrl);
	var baseUrl=req.baseUrl;
	if(/\.json/.test(baseUrl)){
		return res.json({
			code:'500',
			message:baseUrl+'对应的Mock数据不存在，请在mock目录中添加'
		})
	}
	//如果app.js通过app.use配置了静态资源的路径，将优先遵循第一个规则
	if(/\.js$/.test(baseUrl)){
		console.log('js')
	}else if(/\.css$/.test(baseUrl)){
		console.log('css')
	}else{
		handleHTML(req,res,next);
	}
})

function handleHTML(req,res,next){
	var baseUrl=req.baseUrl;
	var htmlFile;
	if(/\html/.test(baseUrl)){
		htmlFile=HTML_ROOT+baseUrl;
	}else{
		htmlFile=HTML_ROOT+baseUrl+'/index.html';
	}
	//console.log(htmlFile);
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	if(fs.existsSync(htmlFile)){
		var html=fs.readFileSync(htmlFile,'utf-8');
		res.write(html);
	}else{
		res.write('<h3>'+req.baseUrl+' 对应的View不存在，请在views目录添加</h3>');
	}
	res.end();
}

module.exports = router;
