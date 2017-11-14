define(function(require, exports, module){
	
	/**
     * @name Configurable
     * @class 描述。
     */
    var configurable = function(targetFunction, config, listeners){
    	listeners = listeners || {};
    	for(var item in config){
    		(function(item){
    			targetFunction[item] = function(value){
    				if(!arguments.length) return config[item];
    				config[item] = value;
    				if(listeners.hasOwnProperty(item)){
    					listeners[item](value);
    				}
    				
    				return targetFunction;
    			}
    		})(item);
    	}
    }
    
    module.exports = configurable;
});