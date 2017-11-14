define(function(require, exports, module){
	
	/**
     * @name Copy
     * @class 提供点击元素复制指定内容功能。
     * @requires jquery
     * @author 李博龙
     * @version v1.0.0
     */
	
	
	require('./ZeroClipboard');
	ZeroClipboard.config({
		// SWF inbound scripting policy: page domains that the SWF should trust. (single string or array of strings)
		trustedDomains: [window.location.host],
		// Include a 'nocache' query parameter on requests for the SWF
		cacheBust: true,
		// Forcibly set the hand cursor ('pointer') for all clipped elements
		forceHandCursor: false,
		// The z-index used by the Flash object. Max value (32-bit): 2147483647
		zIndex: 999999999,
		// Debug enabled: send `console` messages with deprecation warnings, etc.
		debug: false,
		// Sets the title of the `div` encapsulating the Flash object
		title: '复制',
		// Setting this to `false` would allow users to handle calling `ZeroClipboard.activate(...);`
		// themselves instead of relying on our per-element `mouseover` handler
		autoActivate: true,
		/** @deprecated */
		// The class used to indicate that a clipped element is being hovered over
		hoverClass: 'hover',
		/** @deprecated */
		// The class used to indicate that a clipped element is active (is being clicked)
		activeClass: 'current',
		/** @deprecated */
		// DEPRECATED!!! Use `trustedDomains` instead!
		// SWF inbound scripting policy: page origins that the SWF should trust. (single string or array of strings)
		trustedOrigins: null,
		/** @deprecated */
		// SWF outbound scripting policy. Possible values: 'never', 'sameDomain', 'always'
		allowScriptAccess: null,
		/** @deprecated */
		// Include a 'nocache' query parameter on requests for the SWF
		useNoCache: true,
		/** @deprecated */
		// URL to movie
		moviePath: seajs.data.base + 'plugins/copy/1.0.0/flash/ZeroClipboard.swf'
	});
	
	var $ = require('jquery');
	
	/**
     * @name Copy#init
     * @function   
     * @desc 初始化复制按钮。
     * @param {Object} options
     * @example
     * define(function(require) {
     *     $(function() {
     *     
     *         var $copy = require('copy');
     *         
     *         //示例1
     *         $copy.init({
     *     	       item: '.btn_large_blue01',
     *     	       content: $('.ipt_text:last').val(),
     *     	       hoverClass: 'dragon',
     *     	       title: '复制input',
     *     	       mouseover: function(client){
     *     		       client.setText($('.ipt_text:last').val());
     *     	       },
     *     	       callback: function(data){
     *     		       $dialog.alert('复制成功！','success');
     *     	       }
     *         });
     *         
     *         //示例2
     *         $copy.init({
     *     	       item: '.btn_orange01',
     *     	       content: $('.green:first'),
     *     	       callback: function(data){
     *     		       $dialog.alert('复制成功！','success');
     *     	       }
     *         });
     *     });
     * });
     */
	var initCopy = function(option){
		var op = $.extend({
			item: '',
			content: '',
			title: '复制',
			hoverClass: 'hover',
			activeClass: 'current',
			mouseover: null,
			mouseout: null,
			mousedown: null,
			mouseup: null,
			error: null,
			callback: function(data){
				seajs.log('Copy: '+data);
			}
		},option),
		$item = (typeof op.item=='string'? $(op.item):op.item),
		$content = (typeof op.content=='string'? $(op.content):op.content);
		
		if($item.size()<1)return;
		$item.each(function(){
			var $this = $(this), client = $this.data('miningCopyClient');
			if(!mining.utils.isEmpty(client))return;
			
			var client = new ZeroClipboard($this);
			client.on('load', function(client){
				client.on('mouseenter', function(client, args) {
					$this.addClass(op.hoverClass);
					client.setTitle(op.title);
					if(!mining.utils.isEmpty(op.mouseover) && $.isFunction(op.mouseover))op.mouseover.call(this, client, args);
				});
				client.on('mouseleave', function(client, args) {
					$this.removeClass(op.hoverClass);
					if(!mining.utils.isEmpty(op.mouseout) && $.isFunction(op.mouseout))op.mouseout.call(this, client, args);
				});
				client.on('mousedown', function(client, args) {
					if(!mining.utils.isEmpty(op.mousedown) && $.isFunction(op.mousedown))op.mousedown.call(this, client, args);
				});
				client.on('mouseup', function(client, args) {
					if(!mining.utils.isEmpty(op.mouseup) && $.isFunction(op.mouseup))op.mouseup.call(this, client, args);
				});
				client.on('datarequested', function(client){
					var content = '';
					if($content.isTag('input') || $content.isTag('textarea')){
						content = $content.val();
					}else{
						content = $content.html();
					}
					client.setText(content);
				});
		        client.on('complete', function(client, args){
		        	$this.addClass(op.activeClass);
		        	if(!mining.utils.isEmpty(op.callback) && $.isFunction(op.callback))op.callback.call(this, args.text);
		        });
			});

			client.on('wrongflash noflash', function(){
				ZeroClipboard.destroy();
			});
			
			$this.data('miningCopyClient', client);
		});
	}
	
	return {
		init: initCopy
	}
});