'use strict';
(function($){
	$.fn.marquee=function(options){
		var defaults = {
			speed:2500,//滚动速度
			dealy:4000,//延迟
			rowHeight:20//每行的高度
		}
		var opts=$.extend({},defaults,options),intId = [];
		var top=0;
		function marquee(obj,step){
			top-=opts['rowHeight'];
			obj.find('ul').animate({
				'margin-top':top+'px'
			},opts.speed,'linear',function(){
				var s=Math.abs(parseInt($(this).css('margin-top')));
				if(s>=step){
					$(this).find('li').slice(0,1).appendTo($(this));
					$(this).css('margin-top',0);
					top=0;
				}
			})
		}
		this.each(function(i){
			var sh=opts['rowHeight'],delay=opts['delay'],_this=$(this);
			intId[i]=setInterval(function(){
				if(_this.find('ul').height()<=_this.height()){
					clearInterval(intId[i]);
				}else{
					marquee(_this,sh);
				}
			},delay);
		})
	}
})(jQuery);
//module.exports=marquee;