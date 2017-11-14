'use strict';
require('commonCss');
require('./index.css');

var pageParams={
}

var template = require("./tmpl/index.jade"); //返回一个函数
var loginBg=require('../../public/images/login-bg.png');
var html = template({
	'title':'登陆',
	'bg':loginBg
})
$('body').html(html);
bindEvents();
function bindEvents(){
	$('.input-group').click(function(){
		var $placeholder=$(this).find('span');
		var $input=$(this).find('input');
		$placeholder.hide();
		$input.focus();
	})
	$('input').focus(function(){
		if($(this).val()==''){
			$(this).prev('span').hide();
		}
	})
	$('input').blur(function(){
		if($(this).val()==''){
			$(this).prev('span').show();
		}
	})
	$('.login-btn').click(function(){
		window.location.href='/';
	})
}