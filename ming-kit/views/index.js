seajs.use(['jquery','mp3'],function(){
	factory();
})
function factory(){
	'use strict';
	require('./index.css');
	var Star = require('./Star');
	var Dot = require('./Dot');
	//初始化DOM
	var template = require("./index.jade"); //返回一个函数
	var html = template();
	$('.container').html(html);//最好不要用body，这样将script标签清掉了，但是不影响页面运行，因为js已经加载
	//播放器功能
	var song = [
		{
			'cover' : require('../public/images/girl.jpg'),
			'src' : './mp3/Gravity.mp3',
			'title' : 'Gravity'
		},
		{
			'cover' : require('../public/images/girl.jpg'),
			'src' : './mp3/Gravity.mp3',
			'title' : 'Gravity2'
		}
	];
	var audioFn = audioPlay({
		song : song,
		autoPlay : true  //是否立即播放第一首，autoPlay为true且song为空，会alert文本提示并退出
	});
	/* 向歌单中添加新曲目，第二个参数true为新增后立即播放该曲目，false则不播放 */
	audioFn.newSong({
		'cover' : require('../public/images/girl.jpg'),
		'src' : './mp3/Gravity.mp3',
		'title' : 'Gravity3'
	},false);
	//星空效果
	var canvas  = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		WIDTH,
		HEIGHT,
		mouseMoving = false,
		mouseMoveChecker,
		mouseX,
		mouseY,
		stars = [],
		initStarsPopulation = 80,
		dots,
		dotsMinDist = 2,
		maxDistFromCursor = 50;
	window['dots'] = dots = [];
	setCanvasSize();
	init();

	function setCanvasSize() {
		WIDTH = document.documentElement.clientWidth,
	    HEIGHT = document.documentElement.clientHeight;                      

		canvas.setAttribute("width", WIDTH);
		canvas.setAttribute("height", HEIGHT);
	}

	function init() {
		ctx.strokeStyle = "white";
		ctx.shadowColor = "white";
		for (var i = 0; i < initStarsPopulation; i++) {
			stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT),ctx);
			//stars[i].draw();
		}
		ctx.shadowBlur = 0;
		animate();
	}

	function animate() {
	    ctx.clearRect(0, 0, WIDTH, HEIGHT);

	    for (var i in stars) {
	    	stars[i].move();
	    }
	    for (var i in dots) {
	    	dots[i].move();
	    }
	    drawIfMouseMoving();
	    requestAnimationFrame(animate);
	}

	window.onmousemove = function(e){
		mouseMoving = true;
		mouseX = e.clientX;
		mouseY = e.clientY;
		clearInterval(mouseMoveChecker);
		mouseMoveChecker = setTimeout(function() {
			mouseMoving = false;
		}, 100);
	}


	function drawIfMouseMoving(){
		if (!mouseMoving) return;

		if (dots.length == 0) {
			dots[0] = new Dot(0, mouseX, mouseY,ctx,dots);
			dots[0].draw();
			return;
		}

		var previousDot = getPreviousDot(dots.length, 1);
		var prevX = previousDot.x; 
		var prevY = previousDot.y; 

		var diffX = Math.abs(prevX - mouseX);
		var diffY = Math.abs(prevY - mouseY);

		if (diffX < dotsMinDist || diffY < dotsMinDist) return;

		var xVariation = Math.random() > .5 ? -1 : 1;
		xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
		var yVariation = Math.random() > .5 ? -1 : 1;
		yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
		dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation,ctx,dots);
		dots[dots.length-1].draw();
		dots[dots.length-1].link();
	}
	function getPreviousDot(id, stepback) {
		if (id == 0 || id - stepback < 0) return false;
		if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
		else return false;//getPreviousDot(id - stepback);
	}
	//setInterval(drawIfMouseMoving, 17);
}