'use strict';
//var state = {};
function Store(options) {
	var opts = options || {};
	this.state = this.initState = opts;
}
Store.prototype.getState = function() {
	if(typeof Object.freeze === 'function'){
		Object.freeze(this.state);//冻结对象不可修改
	}
	return this.state;
}
Store.prototype.dispatch = function (action) {
	if(action.hasOwnProperty('type') && action.hasOwnProperty('payload')){
		//console.log(action.type+'变化前：'+JSON.stringify(state[action.type]));
		var tempState = $.extend(true,{},this.state);
		tempState[action.type] = action.payload;
		this.state = tempState;
		//console.log(state);
		//console.log(action.type+'变化后：'+JSON.stringify(state[action.type]));
	}else{
		//console.log('action必须遵从标准结构，如：{"type":"user","payload":{"name":"vincent","age":"18"}}');
	}
}
Store.prototype.getInitialState = function() {
	this.state = this.initState;
	//console.log(state.customerCreditCardInfo);
	return this.state;
}
module.exports=Store;
