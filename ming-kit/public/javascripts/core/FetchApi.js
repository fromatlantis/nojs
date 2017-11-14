'use strict';
var Toasts=require('./Toasts');
function FetchApi(options,callback){
	var opts=options||{};
	this.urlApi=opts.urlApi;
	this.postData=opts.postData||{};
	this.records={};
	this.callback=callback;
	this.type=opts.type||'post';
	this.dataType=opts.dataType||'json';
	_init.call(this);
}
var toasts=new Toasts();
function _init(){
	var me=this;
	$.ajax({
		url:me.urlApi,
		type:me.type,
		dataType:me.dataType,
		data:me.postData,
		success:function(res){
			me.records=res;
			if(me.callback)
				me.callback();
		},
		error:function(ex){
			toasts.alert(me.urlApi+' failed '+ex);
		}
	})
}
module.exports=FetchApi;
