define(function(require, exports, module){
	
	/**
     * @name timeLine
     * @class 描述。
     */
    "use strict";
    require('d3');
    require.async('./timeline.css');
    
	var configurable = require('./util/configurable');
	
	window.istimeline = false;
	
	var timeline = function(d3){
		var eventLine = require('./eventline')(d3);
		var filterData = require('./filterdata');
		
		var defaultConfig = {
			start: new Date(0),
			end: new Date(),
			minScale: 0.02,
			maxScale: 5000,
			width: 1000,
			height: 100,
			barwidth: 6,
			margin: {
				top: 30,
				right:20,
				bottom: 0,
				left: 20
			},
			locale: d3.locale({
                "decimal": ",",
                "thousands": " ",
                "grouping": [3],
                "dateTime": "%Y %B %e %A, %X",
                "date": "%Y/%m/%d",
                "time": "%H:%M:%S",
                "periods": ["上午", "下午"],
                "days": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                "shortDays": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                "months": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                "shortMonths": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            }),
			axisFormat: function(xAxis) {
                xAxis.ticks(5);
            },
			tickFormat: [
			  [".%L", function(d) {
			  	return d.getMilliseconds(); 
			  }],
			  [":%S", function(d) { 
			  	return d.getSeconds(); 
			  }],
			  ["%I:%M", function(d) { 
			  	return d.getMinutes(); 
			  }],
			  ["%I点 %p", function(d) { return d.getHours(); }],
			  ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
			  ["%b %d", function(d) { 
			  	return d.getDate() != 1; 
			  }],
			  ["%B", function(d) { 
			  	return d.getMonth();
			  }],
			  ["%Y", function() { 
			  	return true; 
			  }]
			],
			
			//event callback
			eventHover: null,
			eventZoom: null,
			eventClick: null,
			
			//brush callback
			brushStart: null,
			brushMove: null,
			brushEnd: null,
			brushClose: null,
			
			hasDelimiter: true,
			hasXCur: true,
			eventColor: function(index, name){
				return d3.scale.category20()(index)
			}
		};
		
		return function timeLine(config){
			var xScale = d3.time.scale(),
				yScale = d3.scale.linear(),
				brush = d3.svg.brush(),
				stackData = [];

			config = config || {};
			for(var key in defaultConfig){
				config[key] = config[key] || defaultConfig[key];
			}
			
			function timeLineGraph(selection){
				selection.each(function(data){
					var cloneData = function(param){
						var newparam = [];
						$.each(param, function(i,n){
							var obj = {name: n.name, data: []};
							$.each(n.data, function(j,m){
								obj.data.push({count: m.count, time: m.time});
							});
							newparam.push(obj);
						});
						return newparam;
					}
					var initdata = cloneData(data);
					//转换数据
					var stack = d3.layout.stack()
							.values(function(d){ return d.data; })
							.x(function(d){ return d.time; })
							.y(function(d){ return d.count; });
							
					var dataset;
					assortDataset();
					
					d3.select(this).select('svg').remove();
					
					var svg = d3.select(this)
						.append('svg')
						.classed('timelinesvg', true)
						.attr('width', config.width)
						.attr('height', config.height);
					  
					// 绘制坐标轴
					var graphWidth = config.width - config.margin.right - config.margin.left,
						graphHeight = config.height - config.margin.top - config.margin.bottom,
						yHeight = graphHeight - config.margin.top;
						
					var graph = svg.append('g')
						.classed('graph', true);
					
					xScale.range([0, config.width]).domain([config.start, config.end]);
					
					var gap = Math.round((yHeight)/5)
					var gapArr = [];
					for(var i = 0; i < 5; i++){
						gapArr.push(i * gap);
					}
					yScale.rangeRound([0, yHeight]);	//值域
					
					// Brush
					var brushHeight = config.height - config.margin.top;
					brush.x(xScale)
    					.extent([.3, .5]);
    					
					var gBrush = svg.append('g')
						.attr("class", "brush")
						.attr('transform', 'translate(0, ' + config.margin.top + ')')
						.call(brush)
						.call(brush.event);
						
	          		gBrush.selectAll("rect")
	          			.attr("height", brushHeight);
	          		gBrush.selectAll(".resize")
	          			.append("path")
	          			.attr("d", resizePath);
		          
		          	function resizePath(d) {
		          		return;
				        var e = +(d == "e"),
				            x = e ? 1 : -1,
				            y = brushHeight / 3;
				        return "M" + (.5 * x) + "," + y
				            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
				            + "V" + (2 * y - 6)
				            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
				            + "Z"
				            + "M" + (2.5 * x) + "," + (y + 8)
				            + "V" + (2 * y - 8)
				            + "M" + (4.5 * x) + "," + (y + 8)
				            + "V" + (2 * y - 8);
				    }
		          	
          			/*var tools = svg.append('g')
          				.classed('svgtools', true)
          				.attr('transform', 'translate(' + (config.width - config.margin.left - config.margin.right) + ', 15)');
          			
          			tools.append('text')
          				.classed('showbrush', true)
          				.attr('transform', 'translate(-50,0)')
	          			.attr('fill', '#5d8ec8')
	          			.text('时间框');
          			tools.append('text')
          				.classed('closebrush', true)
          				.attr('transform', 'translate(0,0)')
	          			.attr('fill', '#5d8ec8')
	          			.text('关闭');
	          		
	          		d3.select('.showbrush').on('click', function(){
	          			istimeline = true;
	          			zoomRect.style("display", 'none');
	          			
	          			d3.select('.showbrush').classed('active', true);
	          			d3.select('.closebrush').classed('active', false);
	          		});
	          		
	          		d3.select('.closebrush').on('click', function(){
	          			istimeline = false;
	          			brush.clear();
	          			svg.selectAll(".brush").call(brush);
	          			zoomRect.style("display", null);
	          			
	          			d3.select('.showbrush').classed('active', false);
	          			d3.select('.closebrush').classed('active', true);
	          			if(config.brushClose){
							config.brushClose();
						}
	          		});*/
	          		
	          		var closebrush = svg.append('text')
      					.classed('closebrush', true)
          				.attr('fill', '#5d8ec8')
          				.style('cursor', 'pointer')
          				.style('display', 'none')
          				.text('×');
	          		
		          	closebrush.on('click', function(){
		          		d3.select(this).style('display', 'none');
	          			brush.clear();
	          			svg.selectAll('.brush').call(brush);
	          			
	          			if(config.brushClose){
							config.brushClose();
						}
	          		});
	          		var isAuto = false;
		          	var brushstart = function(){
		          		closebrush.style('display', 'none');
		          		if(config.brushStart){
							config.brushStart();
						}
		          	}
		          	var brushmove = function(){
		          		if(config.brushMove){
							config.brushMove(brush);
						}
  						//circle.classed("selected", function(d) { return s[0] <= d && d <= s[1]; });
		          	}
		          	var brushend = function(){
		          		var w = parseInt(gBrush.select('.extent').attr('width'));
		          		if(w < 10){
		          			gBrush.select('.closebrush').style('display', 'none');
		          			brush.clear();
		          			svg.selectAll('.brush').call(brush);
		          			
		          			if(config.brushClose){
								config.brushClose();
							}
		          			return;
		          		}
		          		// svg.selectAll('.brush').call(brush);
		          		closebrush.attr('transform', 'translate(' + (parseFloat(gBrush.select('.extent').attr('x')) + parseFloat(gBrush.select('.extent').attr('width')) - 20) + ', 52)')
		          			.style('display', null);
		          			
		          		if(config.brushEnd){
							config.brushEnd(brush,new Date(xScale.domain()[1]).getTime());
						}
						if(isAuto){
							isAuto = false;
							autoPlay(true,true,brush.extent());
						}
		          	}
	          		
	          		d3.rebind(svg, brush, "on");
	          		brush.on("brushstart", brushstart)
					    .on("brush", brushmove)
					    .on("brushend", brushend);
					// svg.on("brushstart", brushstart)
					//     .on("brush", brushmove)
					//     .on("brushend", brushend);

					// 
					
					//自动播放
					window.brushAutomove = function(time){
						if(brush.empty())return;
		          		time = time || 3000;
		          		isAuto = true;
	          			var range = brush.extent(),
		          			t1 = range[0],
		          			t2 = range[1],
		          			t4 = xScale.domain()[1],
		          			t3 = moment(t4).subtract(moment(range[1]).diff(moment(range[0]))).toDate();
		          		d3.select('.brush').transition()
					      	.duration(time)
					      	.ease('linear')
					      	.call(brush.extent([t3, t4]))
					      	.call(brush.event);
		          	}
					
					// Zoom控制
					var zoomWidth = config.width,
						zoomHeight = config.height - config.margin.top,
						zoom = d3.behavior.zoom().center(null).scaleExtent([config.minScale, config.maxScale]).on('zoom', updateZoom),
						curx,
						cury,
						zoomRect;
					
					zoomRect = svg
						.append('rect')
						.call(zoom)
						.classed('zoom', true)
						.attr('width', zoomWidth)
						.attr('height', zoomHeight / 2)
						.attr('transform', 'translate(0, ' + (config.margin.top + zoomHeight / 2) + ')');
					zoom.x(xScale);
					zoom.on('zoomend', zoomEnd);
					//zoom.size([zoomWidth, zoomHeight]);
					
					/*var zoomInterval = 0,
						zoomtimer = 0,
						zoomduration = 500,
						zoomchangetime = 2000;
						
		          	zoomRect.on('mousedown', function(event){
		          		clearInterval(zoomInterval);
		          		zoomInterval = setInterval(function(){
		          			zoomtimer += zoomduration;
		          			if(zoomtimer >= zoomchangetime){
		          				clearInterval(zoomInterval);
		          				zoomRect.style("display", "none");
		          			}
		          		}, zoomduration);
		          	});
		          	zoomRect.on('mouseup', function(event){
		          		clearInterval(zoomInterval);
		          	});*/
		          	
					if(typeof config.eventHover === 'function'){
						zoomRect.on('mousemover', function(d, e){
							var event = d3.event;
							if(curx == event.clientX && cury == event.clientY) return;
							curx = event.clientX;
							cury = event.clientY;
							zoomRect.attr('display', 'none');
							
							var el = document.elementFromPoint(d3.event.clientX, d3.event.clientY);
							zoomRect.attr('display', 'block');
							if(el.tagName !== 'circle') return;
							config.eventHover(el);
						});
					}
					
					if(typeof config.eventClick === 'function'){
						zoomRect.on('click', function(d, e){
							zoomRect.attr('display', 'none');
							var el = document.elementFromPoint(d3.event.clientX, d3.event.clientY);
							zoomRect.attr('display', 'block');
							if(el.targetName !== 'circle') return;
							config.eventClick(el);
						});
					}
					
					function updateZoom(){
						if(zoomRect.style("display") == 'none')return;
						if(d3.event.sourceEvent && d3.event.sourceEvent.toString() === '[object MouseEvent]'){
							zoom.translate([d3.event.translate[0], 0]);
						}
						
						if(d3.event.sourceEvent && d3.event.sourceEvent.toString() === '[object WheelEvent]'){
							zoom.scale(d3.event.scale);
						}
						assortDataset();
						redraw();
						if(scopa_timelineaction && config.brushMove){
							config.brushMove(brush);
						}
					}
					
					function zoomEnd(){
						if(config.eventZoom){
							config.eventZoom(xScale);
						}
						if(scopa_timelineaction && config.brushMove){
							config.brushMove(brush);
						}
						if(config.hasDelimiter){
							redrawDelimiter();
						}
					}
					
					function assortDataset(){
						var limit = xScale.domain(),
        					period = parseInt((limit[1] - limit[0]) / (1000 * (config.width / config.barwidth)) ),
							newdata = cloneData(initdata), 
							_initdata = [],
							num = 0,
							count = 0;
						
						if(period < 1){
							period = parseInt((config.end - config.start) / (1000 * (config.width / config.barwidth)) );
						}
						var mergerData = function(){
							$.each(_initdata, function(i,n){
								var obj = {name: n.name, data: []}, jump = false;
								num = 0;
								$.each(n.data, function(j,m){
									if(jump || j > n.data.length -1){
										jump = false;
										return;
									}
									if( j == n.data.length - 1){
										obj.data.push({
					    					count: m.count,
					    					time: m.time
					    				});
										return;
									}
									
									var o = n.data[j + 1], gap = moment(o.time).diff(moment(m.time), 'second');
									//seajs.log(gap + '  **  ' + period)
									if(gap <= period){
										obj.data.push({
					    					count: m.count + o.count,
					    					time: new Date(moment(m.time).add(parseInt(gap / 2), 'seconds'))
					    				});
										jump = true;
										num++;
									}else{
										obj.data.push({
					    					count: m.count,
					    					time: m.time
					    				});
									}
								});
								newdata.push(obj);
							});
						}
						do{
							_initdata = cloneData(newdata);
							newdata = [];
							mergerData();
							count++;
						}while(num > 0 && count < 100);
						
						dataset = stack(newdata);
					}
					
					function drawXAxis(){
						
						var tickFormatData = [];
						
						config.tickFormat.forEach(function(item){
							var tick = item.slice(0);
							tickFormatData.push(tick);
						});
						
						var tickFormat = config.locale ? config.locale.timeFormat.multi(tickFormatData) : d3.time.format.multi(tickFormatData);
						var xAxis = d3.svg.axis()
							.scale(xScale)
							.orient('bottom')
							.tickFormat(tickFormat);
						  
						//seajs.log(moment(xScale.domain()[0]).format('YYYY-MM-DD HH:mm:ss') + ' 至 ' + moment(xScale.domain()[1]).format('YYYY-MM-DD HH:mm:ss'))
						if(typeof config.axisFormat === 'function'){
							config.axisFormat(xAxis);
						}
						
						var y = parseInt(graphHeight) + config.margin.top - 30;
						
						graph.select('.x-axis').remove();
						var xAxisEl = graph
							.append('g')
							.classed('x-axis', true)
							.attr('transform', 'translate(0, ' + y + ')')
							.call(xAxis);
							
						xAxisEl.selectAll('text')
							.attr('fill', '#5d8ec8');
					}
					
					function drawYAxis(){
						
						// 最大数量（定义域的最大值）
						var num = 5;
						var maxCount = stackData.length > 0 ? d3.max(stackData[stackData.length-1].data, function(d){ 
							return d.y0 + d.y; 
						}) : 0;
						maxCount = maxCount > 5 ? maxCount : 5;
						
						var valArr = [];
						var val = Math.ceil(maxCount/num);
						for(var i = num; i > 0; i--){
							valArr.push(i * val);
						}
						maxCount = maxCount > (val * num) ? maxCount : (val * num);
					
						yScale.domain([0, maxCount]);
					
						var yAxis = d3.svg.axis()
							.scale(yScale)
							.orient('left');
							
						graph.select('.y-axis').remove();
						var yAxisEl = graph
							.append('g')
							.classed('y-axis', true)
							.attr('transform', 'translate(0, ' + config.margin.top + ')');
							
							
						var yTick = yAxisEl.selectAll('text').data(gapArr);
						
						yTick.enter()
							.append('text')
							.text(function(d, index){
								return valArr[index];
							})
							.attr('transform', function(d, index){
						  		return 'translate(' + config.margin.left + ', ' + (gapArr[index] + 4) + ')';
						 	})
							.attr('fill', '#5d8ec8')
							.attr('text-anchor', 'middle')
							.classed('y-tick', true)
						yTick.exit().remove();
						
						
						
						var yLine = yAxisEl.selectAll('g').data(gapArr);
						yLine.enter()
							.append('g')
							.classed('y-line', true)
							.attr('transform', 'translate(0.5 0.5)')
							.append('line')
							.attr('transform', function(d, index){
						  		//return 'translate(0, ' + yScale(d) + ')';
						  		return 'translate(0, ' + gapArr[index] + ')';
						 	})
							.attr('stroke-dasharray', '2,2')
							.attr('x1', config.margin.left + 20)
							.attr('x2', config.width);
						yLine.exit().remove();
							/*svg.append("g")
					.attr("class","axis")
					.attr("transform","translate(" + padding.left + "," + (height - padding.bottom - yRangeWidth) +  ")")
					.call(yAxis); 
					
					
						
						var yAxisEl = graph.append('g')
							.classed('y-axis', true)
							.attr('transform', 'translate(0, 60)');
						  
						var yTick = yAxisEl.append('g').selectAll('g').data(yDomain);
						
						yTick.enter()
							.append('g')
							.attr('transform', function(d){
						  	return 'translate(0, ' + yScale(d) + ')';
						  })
							.append('line')
							.classed('y-tick', true)
							.attr('x1', config.margin.lefnt)
							.attr('x2', config.margin.left + graphWidth);
						
						yTick.exit().remove();*/
						
					}
					
					var drawChart = function(){
						//添加分组元素
						graph.select('.graph-body').remove();
						var graphBody = graph
							.append('g')
							.classed('graph-body', true)
							.attr('transform', 'translate(' + config.margin.left +', ' + (config.margin.top - 30) + ')');
							
						var groups = graphBody.selectAll("g")
							.data(stackData)
							.enter()
							.append("g")
							.style("fill",function(d,i){ 
								return config.eventColor(i, d.name);
							});
				
						//添加矩形
						var rects = groups.selectAll("rect")
							.data(function(d){
								return d.data;
							})
							.enter()
							.append("rect")
							.attr("x",function(d){
								return xScale(d.time); 
							})
							.attr("y",function(d){
								return yHeight - yScale(d.y0 + d.y); 
							})
							.attr("width", config.barwidth)
							.attr("height",function(d){ 
								return yScale(d.y); 
							})
							.attr("transform","translate(-25 ," + config.margin.top + ")");
					}
					
					var drawXCur = function(){
						graph.select('.x-axis-cur').remove();
						
						var curXEl = graph
							.append('g')
							.classed('x-axis-cur', true);
						var defs = curXEl.append('defs');
						var radialGradient = defs.append('radialGradient')
							.attr('id', 'curElbg')
							.attr('cx', '50%')
							.attr('cy', '50%')
							.attr('cr', '50%')
							.attr('fx', '50%')
							.attr('fy', '50%');
						var stop1 = radialGradient.append('stop')
							.attr('offset', '0%')
							.style('stop-color', 'rgba(255,255,255,0.9)')
							.style('stop-opacity', '1');
						var stop2 = radialGradient.append('stop')
							.attr('offset', '100%')
							.style('stop-color', 'rgba(7,144,250,0.9)')
							.style('stop-opacity', '0');
						var curXElEllipse = curXEl.append('ellipse')
							.attr('cx', -10)
							.attr('cy', 100)
							.attr('rx', 4)
							.attr('ry', config.height / 2)
							.attr('fill', 'url(#' + radialGradient.attr('id') + ')');
						var curxElTextbg = curXEl.append('rect')
							.attr('x', -140)
							.attr('y', 5)
							.attr('width', 140)
							.attr('height', 20)
							.attr('fill', 'rgba(232, 234, 236, 1)')
							//.attr('fill', 'rgba(23, 44, 66, 0.1)')
						var curXElText = curXEl.append('text')
							.attr('x', -30)
							.attr('y', 20)
							.attr('fill', '#5d8ec8')
							
						svg.select('.zoom').on('mousemove', function(evt){
							var _offsetX = d3.event.offsetX;
							var _limit = xScale.domain();
							var _width = xScale.range()[1];
							var _offsetTime = moment(_limit[0]).add(parseInt(_limit[1] - _limit[0]) * _offsetX / _width, 'ms').format('YYYY-MM-DD HH:mm:ss')
	                    	
							curXElEllipse.attr('cx', _offsetX);
							curxElTextbg.attr('x', _offsetX - 60)
							curXElText.attr('x', _offsetX - 50).text(_offsetTime);
						}).on('mouseover', function(){
							drawXCur();
						}).on('mouseout', function(){
							graph.select('.x-axis-cur').remove();
						}).on('mousedown', function(){
							d3.select(this).classed('mousedown', true);
						}).on('mouseup', function(){
							d3.select(this).classed('mousedown', false);
						}).call(brush);
					}
					
					function redrawDelimiter(){
						graph.select('.delimiter').remove();
						var delimiterEl = graph
							.insert('g', ':first-child')
							.classed('delimiter', true)
							.attr('width', graphWidth)
							.attr('height', 10)
							.attr('transform', 'translate(10, ' + (config.margin.top - 10) + ')')
							.append('text')
							.text(function(){
    				  			//return config.locale.timeFormat('%Y-%B-%d')(xScale.domain()[0]) + ' 至 ' + config.locale.timeFormat('%Y-%B-%d')(xScale.domain()[1]);
    				  			return moment(xScale.domain()[0]).format('YYYY-MM-DD') + ' 至 ' + moment(xScale.domain()[1]).format('YYYY-MM-DD');
    				  		})
							.style('fill', '#5d8ec8');
					}
					
					function redraw(){
						stackData = [];
						stackData = filterData(dataset, xScale);
						
						drawYAxis();
						drawXAxis();
						drawChart();
					}
					
					if(config.hasDelimiter){
						redrawDelimiter();
					}
					
					redraw();
					
					if(config.eventZoom){
						config.eventZoom(xScale);
					}
				});
			}
			
			configurable(timeLineGraph, config);
			
			return timeLineGraph;
		}
	}
	
	d3.chart = d3.chart || {};
	d3.chart.timeline = timeline(d3);
});