define(function(require, exports, module){
	
	/**
     * @name FilterData
     * @class 描述。
     */
    
	module.exports = function filterData(data, scale){
		data = data || [];
		var filteredData = [];
		var boundary = scale.range();
		var min = boundary[0];
		var max = boundary[1];
		data.forEach(function(item){
			var arr = [];
			item.data.forEach(function(datum){
				var value = scale(datum.time);
				if(value < min || value > max){
					return;
				}
				arr.push(datum);
			});
			if(arr.length > 0)filteredData.push({name:item.name, data:arr});
		});
		
		return filteredData;
	}
});