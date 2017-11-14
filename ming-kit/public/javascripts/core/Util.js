'use strict';
var config=require('../../../config.json');

function Util(){
	this.version='1.0.0';
}
/**
 * [formatDate description]
 * //示例： 
	alert(new Date().Format("yyyy年MM月dd日")); 
	alert(new Date().Format("MM/dd/yyyy")); 
	alert(new Date().Format("yyyyMMdd")); 
	alert(new Date().Format("yyyy-MM-dd hh:mm:ss"));
 */
Util.prototype.formatDate=function(format,date){
	if(!date){
		date=new Date();
	}else{
		date=new Date(date);
	}
	var args = {
       "M+": date.getMonth() + 1,
       "d+": date.getDate(),
       "h+": date.getHours(),
       "m+": date.getMinutes(),
       "s+": date.getSeconds(),
       "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
       "S": date.getMilliseconds()
   };
   if (/(y+)/.test(format))
       format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
   for (var i in args) {
       var n = args[i];
       if (new RegExp("(" + i + ")").test(format))
           format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
   }
   return format;
}
Util.prototype.getDateStr=function(count) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+count);//获取count天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	var d = dd.getDate(); 
	return y+"-"+m+"-"+d; 
} 
Util.prototype.getDate=function(str){
	str = str.replace(/-/g,"/");
	return new Date(str );
}
Util.prototype.urlParam=function(key){
 	return _urlParam(key);
}
//两个数组取差集
Util.prototype.diffArr=function(target,array,key){
	var result=target.slice();
	for(var i=0;i<result.length;i++){
		for(var j=0;j<array.length;j++){
			if(result[i][key]===array[j][key]){
				result.splice(i,1);
				i--;
				break;
			}
		}
	}
	return result;
}
//手机号脱敏处理
Util.prototype.concealMobile=function(mobile){
	var reg = /^(\d{3})\d{4}(\d{4})$/;
	return mobile.replace(reg,"$1****$2");
}
function _urlParam(key){
	var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
 	var r = window.location.search.substr(1).match(reg);
 	if(r!=null) return unescape(r[2]); return null;
}

Util.prototype.fixedEmpty = function(value,_default){
	if(value=='' || value==undefined || value==null||value == 'NULL'){
		return _default || '-';
	}else if(!isNaN(value)){
		value = parseInt(value) == value ? value : value.toFixed(2)
	}
	return value;
}

Util.prototype.formatMoney = function(_money,_digit){
	var tpMoney = '-';
	var digit = _digit || 2;
	if(undefined != _money){
		tpMoney = _money;			
	}
	tpMoney = new Number(tpMoney);
	if(isNaN(tpMoney)){
		return '-';
	}
	tpMoney = tpMoney.toFixed(digit);
	var re = /^(-?\d+)(\d{3})(\.?\d*)/;
	while(re.test(tpMoney)){
		tpMoney = tpMoney.replace(re,'$1,$2$3')	
	}
	return tpMoney + '元';
}

module.exports=Util;