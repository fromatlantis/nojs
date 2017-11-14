/**
 * @description [description]
 * @author Vincent
 * @div tpl 一定要遵循此DOM结构 ul不能缺少
 *  <div id="scroll-wrapper">
		<ul></ul>
	</div>
 */
'use strict';
var iScroll=require('./iScroll');
var info={
	"pullDownLable":"下拉刷新...",
	"pullingDownLable":"释放刷新...",
	"pullUpLable":"上拉加载...",
	"pullingUpLable":"加载更多...",
	"loadingLable":"加载中..."
};
function RefreshHelper(options){
	var opts=options || {};
	this.version='1.0.0';
	_init(opts);
}

function _init(parameter){		
	var wrapper=document.getElementById(parameter.id);
	var div=document.createElement("div");
		div.id="scroller";
		wrapper.appendChild(div);
	var scroller=document.getElementById("scroller");
	var list=document.querySelector("#"+parameter.id+" ul")
		scroller.insertBefore(list,scroller.childNodes[0]);
		
	var pullDown=document.createElement("div");
		pullDown.id="pullDown";
	var loader=document.createElement("div");
		loader.className="loader";
	for(var i=0;i<4;i++){
		var span=document.createElement("span");
		loader.appendChild(span);	
		}	
		pullDown.appendChild(loader);
			
	var pullDownLabel=document.createElement("div");
		pullDownLabel.className="pullDownLabel";
		pullDown.appendChild(pullDownLabel);	
			
		scroller.insertBefore(pullDown,scroller.childNodes[0]);	
			
		var pullUp=document.createElement("div");
		pullUp.id="pullUp";
		var loader=document.createElement("div");
		loader.className="loader";
	for(var i=0;i<4;i++){
		var span=document.createElement("span");
		loader.appendChild(span);	
		}	
		pullUp.appendChild(loader);
		
		var pullUpLabel=document.createElement("div");
		pullUpLabel.className="pullUpLabel";
		var content=document.createTextNode(info.pullUpLable);
		pullUpLabel.appendChild(content);
		pullUp.appendChild(pullUpLabel);
			
		scroller.appendChild(pullUp);
		//create dom above
		//create dom ,you can wirte it yourself			
	var pullDownEl = document.getElementById('pullDown');
	var pullDownOffset = pullDownEl.offsetHeight;
	var pullUpEl = document.getElementById('pullUp');	
	var pullUpOffset =pullUpEl.offsetHeight;
		//parameter
	_scrollIt(parameter,pullDownEl,pullDownOffset,pullUpEl,pullUpOffset);
}
function _scrollIt(parameter,pullDownEl,pullDownOffset,pullUpEl, pullUpOffset){	
	window.myScroll = new iScroll(parameter.id, {
		useTransition: true,
		vScrollbar: false, //hide the iscroll v bar
		topOffset: pullDownOffset,
		onRefresh: function () {
			_onRelease(pullDownEl,pullUpEl);
		},
		onScrollMove: function () {
			_onScrolling(this,pullDownEl,pullUpEl,pullUpOffset);//element
		},
		onScrollEnd: function () {
			_onPulling(pullDownEl,parameter.pullDownAction,pullUpEl,parameter.pullUpAction);
		}
	});
	setTimeout(function(){pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullDownLable},300);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}
//things loader css on scrolling,you can wirte it yourself			
function _onScrolling(e,pullDownEl,pullUpEl,pullUpOffset){
	if (e.y>-(pullUpOffset)) {
		pullDownEl.className = '';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullDownLable;
		e.minScrollY =-pullUpOffset;
	}	
	if (e.y > 0) {
		pullDownEl.className = 'flip';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullingDownLable;					
		e.minScrollY = 0;
	}			
	if ( e.scrollerH < e.wrapperH && e.y < (e.minScrollY-pullUpOffset) || e.scrollerH > e.wrapperH && e.y< (e.maxScrollY - pullUpOffset) ) {
		document.getElementById("pullUp").style.display="block";
		pullUpEl.className = 'flip';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = info.pullingUpLable;
	} 
	if (e.scrollerH < e.wrapperH && e.y > (e.minScrollY-pullUpOffset) && pullUpEl.className.match('flip') || e.scrollerH > e.wrapperH && e.y > (e.maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
		document.getElementById("pullUp").style.display="none";
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML =  info.pullUpLable;
	}
}
//things loader css on release,you can wirte it yourself
function _onRelease(pullDownEl,pullUpEl){
	if (pullDownEl.className.match('loading')) {			
		pullDownEl.className = '';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullDownLable;	
		pullDownEl.querySelector('.loader').style.display="none"
	    pullDownEl.style.lineHeight=pullDownEl.offsetHeight+"px";				
	}
	if (pullUpEl.className.match('loading')) {				
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = info.pullUpLable;
		pullUpEl.querySelector('.loader').style.display="none"
		pullUpEl.style.lineHeight=pullDownEl.offsetHeight+"px";	
	}
}
//things loader css on pulling,you can wirte it yourself		
function _onPulling(pullDownEl,pullDownAction,pullUpEl,pullUpAction){		
	if (pullDownEl.className.match('flip')) {
		pullDownEl.className = 'loading';
		pullDownEl.querySelector('.pullDownLabel').innerHTML =info.loadingLable;				
		pullDownEl.querySelector('.loader').style.display="block"
		pullDownEl.style.lineHeight="20px";		
		if (pullDownAction)
		pullDownAction();	// Execute custom function (ajax call?)
	} 
	 if (pullUpEl.className.match('flip')) {
		pullUpEl.className = 'loading';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = info.loadingLable;		
		pullUpEl.querySelector('.loader').style.display="block"
		pullUpEl.style.lineHeight="20px";		
		if (pullDownAction) 
		pullUpAction();	// Execute custom function (ajax call?)
	}	
}

module.exports=RefreshHelper;
	