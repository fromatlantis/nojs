define(function(require) {
	
	/**
     * @name Echarts
     * @class 来自百度商业前端数据可视化团队，基于html5 Canvas，是一个纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据可视化图表。创新的拖拽重计算、数据视图、值域漫游等特性大大增强了用户体验，赋予了用户对数据进行挖掘、整合的能力。<a href="http://echarts.baidu.com/" target="_blank" title="homepage">主页</a>
     * @requires jquery
     * @version v1.3.0
     * @example
     * define(function(require) {
     *     $(function() {
     *     		require('echarts');
     *     		
     *     		//示例
     *     		//html:<div id="myChart" style="width:400px;height:200px;"></div>
     *     		var option = {
     *     		    title : {
     *     		        text: '未来一周气温变化',
     *     		        subtext: '纯属虚构'
     *     		    },
     *     		    tooltip : {
     *     		        trigger: 'axis'
     *     		    },
     *     		    legend: {
     *     		        data:['最高气温','最低气温']
     *     		    },
     *     		    toolbox: {
     *     		        show : true,
     *     		        feature : {
     *     		            mark : {show: true},
     *     		            dataView : {show: true, readOnly: false},
     *     		            magicType : {show: true, type: ['line', 'bar']},
     *     		            restore : {show: true},
     *     		            saveAsImage : {show: true}
     *     		        }
     *     		    },
     *     		    calculable : true,
     *     		    xAxis : [
     *     		        {
     *     		            type : 'category',
     *     		            boundaryGap : false,
     *     		            data : ['周一','周二','周三','周四','周五','周六','周日']
     *     		        }
     *     		    ],
     *     		    yAxis : [
     *     		        {
     *     		            type : 'value',
     *     		            axisLabel : {
     *     		                formatter: '{value} °C'
     *     		            }
     *     		        }
     *     		    ],
     *     		    series : [
     *     		        {
     *     		            name:'最高气温',
     *     		            type:'line',
     *     		            data:[11, 11, 15, 13, 12, 13, 10],
     *     		            markPoint : {
     *     		                data : [
     *     		                    {type : 'max', name: '最大值'},
     *     		                    {type : 'min', name: '最小值'}
     *     		                ]
     *     		            },
     *     		            markLine : {
     *     		                data : [
     *     		                    {type : 'average', name: '平均值'}
     *     		                ]
     *     		            }
     *     		        },
     *     		        {
     *     		            name:'最低气温',
     *     		            type:'line',
     *     		            data:[1, -2, 2, 5, 3, 2, 0],
     *     		            markPoint : {
     *     		                data : [
     *     		                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
     *     		                ]
     *     		            },
     *     		            markLine : {
     *     		                data : [
     *     		                    {type : 'average', name : '平均值'}
     *     		                ]
     *     		            }
     *     		        }
     *     		    ]
     *     		}
     *     
     *     		var popChart = echarts.init($('#myChart')[0]);
     *     		popChart.setOption(option);
     *     });
     * });
     */
	
});