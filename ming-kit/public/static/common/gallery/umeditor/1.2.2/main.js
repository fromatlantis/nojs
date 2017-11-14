define(function(require, exports, module){
	var initEditor = function(callback){
		require('./themes/default/css/umeditor.min.css');
		require.async('./umeditor.config', function(){
			require.async('./umeditor.min', function(){
				require.async('./lang/zh-cn/zh-cn.js', function(){
					if(callback)callback();
				});
			});
		});		
	}
	
	module.exports = initEditor;
})
