app.controller("barchartCtrl",function($scope){
	function initBarchart(){
		var barChart = echarts.init(document.getElementById("barchart"));
		var data = [20, 52, 200, 334, 390, 330, 220];
		var barOption = {
			    color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            name : '时间',
//	 			            nameLocation : 'middle',
			            nameGap : 25,
			            nameTextStyle : {
			            	color : 'red'
			            },
			            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : '数量',
//	 			            nameLocation : 'middle',
			            nameGap : 30,
			        }
			    ],
			    series : [
			        {
			            name:'数量',
			            type:'bar',
			            barWidth: '60%',
			            data:data
			        }
			    ]
			};
		barChart.setOption(barOption);
	}
	
	initBarchart();
	
})