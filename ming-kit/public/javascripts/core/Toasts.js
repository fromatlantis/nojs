'use strict';
function Toasts(options){
	var opts=options || {};
	_init();
}
function _init(){
	var toastsDom='<div class="toasts-chip"></div>';
	var alertDom='<div class="alert-chip">'+
						'<div class="alert-box">'+
							'<div class="alert-content"></div>'+
							'<div class="alert-footer">好</div>'+
						'</div>'
				  '</div>';
	//$('body').append(toastsDom);
	//$('body').append(alertDom);
}
Toasts.prototype.show=function(msg){
	$('.toasts-chip').text(msg);
	//$('.toasts-chip').css({'opacity':1});
	execAnim('.toasts-chip','fadeOut',function(){
		$('.toasts-chip').removeClass('fadeOut');
		//$('.toasts-chip').css({'opacity':0});
	});
}
Toasts.prototype.alert=function(msg,callback){
	$('.alert-chip').css({'opacity':1});
	$('.alert-chip').css({'z-index':1});
	$('.alert-content').text(msg);
	var vh=$(window).height();
	var alerth=$('.alert-box').height();
	var top;
	if((vh-alerth)/2-50>0){
		top=(vh-alerth)/2-50;
	}else{
		top=0;
	}
	$('.alert-box').css({'margin-top':top});
	$('.alert-footer').click(function(){
		//alert('请选择油烟机类型');
		if(callback)
			callback();
		setTimeout(function(){
			$('.alert-chip').css({'opacity':0});
			$('.alert-chip').css({'z-index':-1});
		},500);
	})
}
Toasts.prototype.confirm=function(msg,callback){
	$('.confirm-chip').css({'opacity':1});
	$('.confirm-chip').css({'z-index':1});
	$('.confirm-content').text(msg);
	var vh=$(window).height();
	var alerth=$('.confirm-box').height();
	var top;
	if((vh-alerth)/2-50>0){
		top=(vh-alerth)/2-50;
	}else{
		top=0;
	}
	$('.confirm-box').css({'margin-top':top});
	$('.confirm-false').click(function(){
		//alert('请选择油烟机类型');
		setTimeout(function(){
			$('.confirm-chip').css({'opacity':0});
			$('.confirm-chip').css({'z-index':-1});
		},350);
	})
	$('.confirm-true').click(function(){
		if(callback)
			callback();
		setTimeout(function(){
			$('.confirm-chip').css({'opacity':0});
			$('.confirm-chip').css({'z-index':-1});
		},350);
	})
}
function execAnim(el,x,callback) {
    $(el).addClass(x + ' animated delay').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      	if(callback)
	      	callback();
	    });
	};
module.exports=Toasts;
