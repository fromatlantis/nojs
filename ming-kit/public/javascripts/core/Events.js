'use strict';
function Events(options) {
	var opts = options || {};
	this.events = opts;
}
Events.prototype.dispatch = function () {
	var events = this.events;
	//var eventSplitter = /^(\w+)\s*(.*)$/;
	for(var key in events) {
		var method = events[key];
		//var match = key.match(eventSplitter);
		var eventsHandle = arguments[0];
		var el = key.split('@')[0],eventName = key.split('@')[1];
		var $el = arguments.length == 2 ? arguments[1].find(el) : $(el);
		//$(el).off(eventName).on(eventName,eventsHandle[method]);
		if(!!eventsHandle[method]){
			if($el.length>0){
				$el.off(eventName).on(eventName,eventsHandle[method]);
			}else{
				$(document).off(eventName,el).on(eventName,el,eventsHandle[method]);
			}
		}else{
			//console.log(method);
		}
	}
}
/**如果dom重新销毁，事件将不再起作用。需要处理**/
module.exports=Events;
