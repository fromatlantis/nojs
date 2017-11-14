'use strict';
/* 导出Excel */
function dowloadUtil(){
	this.version='1.0.0';
}
dowloadUtil.prototype.down = function(option){
	var op = $.extend({
		url: '',
		params: null
	}, option);
	
	if(op.url == null || op.url == '')return;
	
	var $form = $('<form class="downloadExcel" name="formain" method="post" action="' + op.url + '" style="display:none;"></form>');
	if(op.params){
		var params = op.params;
		$.each(params,function(_key,_val){
			if(!_val) return;
			$form.append('<input name="'+_key+'" value="'+_val+'" />');
		});
	}
	//Firefox必须将form放到页面内才可以提交
	$form.appendTo($('body'));
	$form[0].submit();
	$form.remove();
}

module.exports=dowloadUtil

