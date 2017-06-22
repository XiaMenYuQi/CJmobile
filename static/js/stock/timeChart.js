import Highcharts from 'highcharts/highstock'

//highstock K线图
export let highStockChart = function(divID,result,selectedBtn){
    var firstTouch = true;
    //开盘价，最高价，收盘价，最低价，成交量,价格变动,涨跌幅,5日均价,,10日均价,20日均价,5日均量,10日均量,20日均量，换手率,当前点离左边的相对距离
    var  open,high,close,low,vol,zde,zdf,MA5,MA10,MA20,VolMA5,VolMA10,VolMA20,hsl,relativeWidth;
    //定义数组
    var ohlcArray = [],volumeArray = [],MA5Array = [],MA10Array=[],MA20Array=[],VolMA5Array=[],VolMA10Array=[],VolMA20Array=[],zdfArray=[],zdeArray=[],hslArray=[],data=[],dailyData = [];

	/*
	 * 这个方法用来控制K线上的flags的显示情况，当afterSetExtremes时触发该方法,通过flags显示当前时间区间最高价和最低价
	 * minTime  当前k线图上最小的时间点
	 * maxTime  当前k线图上最大的时间点
	 * chart  当前的highstock对象
	 */
    var showTips = 	function (minTime,maxTime,chart){
        chart.showLoading();
        //定义当前时间区间中最低价的最小值，最高价的最大值 以及对应的时间
        var lowestPrice,highestPrice,array=[],highestArray=[],lowestArray=[],highestTime,lowestTime,flagsMaxData_1=[],flagsMaxData_2=[],flagsMinData_1,flagsMinData_2;
        for(var i=0;i<ohlcArray.length-1;i++){
            if(ohlcArray[i][0]>=minTime && ohlcArray[i][0]<=maxTime){
                array.push([
                    ohlcArray[i][0],
                    ohlcArray[i][2], //最高价
                    ohlcArray[i][3] //最低价
                ])
            }
        }
        if(!array.length>0){
            return;
        }
        highestArray = array.sort(function(x, y){  return y[1] - x[1];})[0];// 根据最高价降序排列
        highestTime =highestArray[0];
        highestPrice =highestArray[1].toFixed(2);
        lowestArray = array.sort(function(x, y){  return x[2] - y[2];})[0]; //根据最低价升序排列
        lowestTime =lowestArray[0];
        lowestPrice =lowestArray[2].toFixed(2);
        var formatDate1 = Highcharts.dateFormat('%Y-%m-%d',highestTime);
        var formatDate2 = Highcharts.dateFormat('%Y-%m-%d',lowestTime);
        flagsMaxData_1 = [{
            x : highestTime,
            title : highestPrice+"("+formatDate1+")"
        }];

        flagsMaxData_2 = [{
            x : highestTime,
            title : highestPrice
        }];
        flagsMinData_1 = [{
            x : lowestTime,
            title : lowestPrice+"("+formatDate2+")"
        }];

        flagsMinData_2 = [{
            x : lowestTime,
            title : lowestPrice
        }];
        var min =  parseFloat(flagsMinData_2[0].title) - parseFloat(flagsMinData_2[0].title)*0.05;
        var max =  parseFloat(flagsMaxData_2[0].title)+parseFloat(flagsMaxData_2[0].title)*0.05;
        var tickInterval = (( max-min)/5).toFixed(1)*1;
        var oneMonth = 1000*3600*24*30;
        var oneYear = 1000*3600*24*365;
        var tickIntervalTime,dataFormat='%Y-%m';
        if(maxTime-minTime>oneYear*2){
            tickIntervalTime = oneYear*2;
            dataFormat = '%Y';
        }else if(maxTime-minTime>oneYear){
            tickIntervalTime = oneMonth*6
        }else if(maxTime-minTime>oneMonth*6){
            tickIntervalTime = oneMonth*3
        }else{
            tickIntervalTime = oneMonth;
            tickIntervalTime = oneMonth;
            dataFormat = '%m-%d'
        }

//		//Y轴坐标自适应
//		 chart.yAxis[0].update({
//	    	   	min : min,
//	    	   	max : max,
//	    	   	tickInterval: tickInterval
//	       });
//		//X轴坐标自适应
//		 chart.xAxis[0].update({
//			 min : minTime,
//			 max : maxTime,
//			 tickInterval: tickIntervalTime,
//			 labels: {
//				   	y:-78,//调节y偏移
//	             formatter: function(e) {
//	             		 return Highcharts.dateFormat(dataFormat, this.value);
//	             }
//	         }
//		 });
        //动态update flags(最高价)
        chart.series[5].update({
            data : flagsMaxData_2,
            point:{
                events:{
                    click:function(){
                        chart.series[5].update({
                            data : flagsMaxData_1,
                            width : 100
                        });
                        chart.series[6].update({
                            data : flagsMinData_1,
                            width : 100
                        });
                    }
                }
            },
            events:{
                mouseOut:function(){
                    chart.series[5].update({
                        data :flagsMaxData_2,
                        width : 25
                    });
                    chart.series[6].update({
                        data :flagsMinData_2,
                        width : 25
                    });
                }
            }
        });

        //动态update flags(最低价)
        chart.series[6].update({
            data : flagsMinData_2,
            point:{
                events:{
                    click:function(){
                        chart.series[6].update({
                            data : flagsMinData_1,
                            width : 100
                        });
                        chart.series[5].update({
                            data : flagsMaxData_1,
                            width : 100
                        });
                    }
                }
            },
            events:{
                mouseOut:function(){
                    chart.series[6].update({
                        data :flagsMinData_2,
                        width : 25
                    });
                    chart.series[5].update({
                        data :flagsMaxData_2,
                        width : 25
                    });
                }
            }
        });
        chart.hideLoading();
    };

    //修改colum条的颜色（重写了源码方法）
    var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
    Highcharts.seriesTypes.column.prototype.drawPoints = function () {
        var merge  = Highcharts.merge,
            series = this,
            chart  = this.chart,
            points = series.points,
            i      = points.length;

        while (i--) {
            var candlePoint = chart.series[0].points[i];
            if(candlePoint.open != undefined && candlePoint.close !=  undefined){  //如果是K线图 改变矩形条颜色，否则不变
                var color = (candlePoint.open < candlePoint.close) ? '#DD2200' : '#33AA11';
                var seriesPointAttr = merge(series.pointAttr);
                //seriesPointAttr[''].fill = color;
                //seriesPointAttr.hover.fill = Highcharts.Color(color).brighten(0.3).get();
                //seriesPointAttr.select.fill = color;
            }else{
                var seriesPointAttr = merge(series.pointAttr);
            }

            points[i].pointAttr = seriesPointAttr;
        }

        originalDrawPoints.call(this);
    }



    //常量本地化
    Highcharts.setOptions({
        global : {
            useUTC : false
        },
        lang: {
            rangeSelectorFrom:"日期:",
            rangeSelectorTo:"至",
            rangeSelectorZoom:"",
            loading:'加载中...',
            shortMonths:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            weekdays:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        }
    });
    //格式化数据，准备绘图
    data = result;
//	dailyData = result.data.reverse();

    //把当前最新K线数据加载进来
    var length = data.length-1;
    var time = parseFloat(data[length][0]);


    for (let i = 0; i < data.length; i++) {
        //	console.log( Highcharts.dateFormat('%A ,%Y-%m-%d %H:%M',parseInt(data[i][0])));
        ohlcArray.push([
            parseInt(data[i].date), // the date
            parseFloat(data[i].open), // open
            parseFloat(data[i].high), // high
            parseFloat(data[i].low), // low
            parseFloat(data[i].close) // close
        ]);
        if(!isNaN(parseFloat(data[i].volume))){
            volumeArray.push([
                parseInt(data[i].date), // the date
                parseInt(data[i].volume) // 成交量
            ]);
        }

        if(!isNaN(parseFloat(data[i].ma5))){
            MA5Array.push([
                parseInt(data[i].date), // the date
                parseFloat(data[i].ma5)
            ]);
        }
        if(!isNaN(parseFloat(data[i].ma10))){
            MA10Array.push([
                parseInt(data[i].date),
                parseFloat(data[i].ma10)
            ]);
        }
        if(!isNaN(parseFloat(data[i].ma20))){
            MA20Array.push([
                parseInt(data[i].date),
                parseFloat(data[i].ma20)
            ]);
        }
        if(!isNaN(parseFloat(data[i].v_ma5))){
            VolMA5Array.push([
                parseInt(data[i].date), // the date
                parseFloat(data[i].v_ma5)
            ]);
        }
        if(!isNaN(parseFloat(data[i].ma10))){
            VolMA10Array.push([
                parseInt(data[i].date),
                parseFloat(data[i].v_ma10)
            ]);
        }
        if(!isNaN(parseFloat(data[i].v_ma20))){
            VolMA20Array.push([
                parseInt(data[i].date),
                parseFloat(data[i].v_ma20)
            ]);
        }

    }

    //开始绘图
    return new Highcharts.StockChart( {
        chart:{
//			width:700,
            height:300,
            renderTo : divID,
            margin: [-30, 20,30,50],
            plotBorderColor: '#3C94C4',
            plotBorderWidth: 0.3,
            events:{
                load:function(){
                    var length = ohlcArray.length-1;
                    showTips(ohlcArray[0][0],ohlcArray[length][0],this);
                }
            }
        },
        loading: {
            labelStyle: {
                position: 'relative',
                top: '10em',
                zindex:1000
            }
        },
        credits:{
            enabled:false
        },
        rangeSelector: {
            //enabled: false
            allButtonsEnabled: true,
            //enabled: false
            buttons: [{
                type: 'month',
                count: 3,
                text: '日K'//1月 日K 0
            }, {
                type: 'year',
                count: 1,
                text: '周K'//1年 周K 1
            }, {
                type: 'year',
                count: 5,
                text: '月K'//所有数据 月K 2
            },{
                type: 'day',
                count: 1.5,
                text: '5分钟'//1天 5分钟 3
            },{
                type: 'day',
                count: 5,
                text: '15分钟'//5天 15分钟 4
            },{
                type: 'day',
                count: 10,
                text: '30分钟'//2周 30分钟 5
            }, {
                type: 'day',
                count: 20,
                text: '60分钟'//4周 60分钟 6
            }],
            buttonTheme: {
                display: 'none' // 不显示按钮
            },
            inputEnabled: false, // it supports only days
            selected :selectedBtn // all
        },
        plotOptions: {
            //修改蜡烛颜色
            candlestick: {
                color: '#33AA11',
                upColor: '#DD2200',
                lineColor: '#33AA11',
                upLineColor: '#DD2200',
                maker:{
                    states:{
                        hover:{
                            enabled:false
                        }
                    }
                }
            },
            //去掉曲线和蜡烛上的hover事件
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                },
                line: {
                    marker: {
                        enabled: false
                    }
                }
            }
        },
        //格式化悬浮框
        tooltip: {
            formatter: function() {
                if(this.y == undefined||this.points[6]== undefined){
                    return;
                }
                for(var i =0;i<data.length;i++){
                    if(this.x == data[i].date){
                        zdf = parseFloat(data[i].p_change).toFixed(2);
                        zde = parseFloat(data[i].price_change).toFixed(2);
                        // hsl = parseFloat(data[i][14]).toFixed(2);
                    }
                }
                open = parseFloat(this.points[0].point.open).toFixed(2);
                high = parseFloat(this.points[0].point.high).toFixed(2);
                low = parseFloat(this.points[0].point.low).toFixed(2);
                close = parseFloat(this.points[0].point.close).toFixed(2);
                vol = parseFloat(this.points[1].point.y*0.0001).toFixed(2);
                MA5 =parseFloat(this.points[2].y).toFixed(2);
                MA10 =parseFloat(this.points[3].y).toFixed(2);
                MA20 =parseFloat(this.points[4].y).toFixed(2);
                VolMA5 =this.points[5].y;
                VolMA10 =this.points[6].y;
                VolMA20 =this.points[7].y;
                relativeWidth = this.points[0].point.shapeArgs.x;
                var stockName = this.points[0].series.name;
                var tip= '<b>'+ Highcharts.dateFormat('%Y-%m-%d  %H:%M', this.x) +'</b><br/>';
                //tip +=stockName+"<br/>";
                if(open>close){
                    tip += '开盘价：<span style="color: #33AA11;">'+open+' </span><br/>';
                    tip += '最高价：<span style="color: #33AA11;">'+high+' </span><br/>';
                    tip += '最低价：<span style="color: #33AA11;">'+low+' </span><br/>';
                    tip += '收盘价：<span style="color: #33AA11;">'+close+' </span><br/>';
                    tip += '涨跌额：<span style="color: #33AA11;">'+zde+' </span><br/>';
                    tip += '涨跌幅：<span style="color: #33AA11;">'+zdf+'% </span><br/>';
                }
                else{
                    tip += '开盘价：<span style="color: #DD2200;">'+open+' </span><br/>';
                    tip += '最高价：<span style="color: #DD2200;">'+high+' </span><br/>';
                    tip += '最低价：<span style="color: #DD2200;">'+low+' </span><br/>';
                    tip += '收盘价：<span style="color: #DD2200;">'+close+' </span><br/>';
                    tip += '涨跌额：<span style="color: #DD2200;">'+zde+' </span><br/>';
                    tip += '涨跌幅：<span style="color: #DD2200;">'+zdf+'% </span><br/>';
                }
                if(vol>10000){
                    tip += "成交量："+(vol*0.0001).toFixed(2)+"(亿股)<br/>";
                }else{
                    tip += "成交量："+vol+"(万股)<br/>";
                }
                //tip += "换手率："+hsl+"<br/>";
                return tip;
            },
            //crosshairs:	[true, true]//双线
            crosshairs: {
                dashStyle: 'dash'
            },
            borderColor:	'white',
            positioner: function () { //设置tips显示的相对位置
                var halfWidth = this.chart.chartWidth/2;//chart宽度
                var width = this.chart.chartWidth-155;
                var height = this.chart.chartHeight/5-8;//chart高度
                if(relativeWidth<halfWidth){
                    return { x: width, y:height };
                }else{
                    return { x: 30, y: height };
                }
            },
            shadow: false
        },
        title: {
            enabled:false
        },
        exporting: {
            enabled: false  //设置导出按钮不可用
        },
        scrollbar: {
            barBackgroundColor: 'gray',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'gray',
            buttonBorderWidth: 0,
            buttonArrowColor: 'yellow',
            buttonBorderRadius: 7,
            rifleColor: 'yellow',
            trackBackgroundColor: 'white',
            trackBorderWidth: 1,
            trackBorderColor: 'silver',
            trackBorderRadius: 7,
            //enabled: false,
            liveRedraw: false //设置scrollbar在移动过程中，chart不会重绘
        },
        navigator: {
            adaptToUpdatedData: false,
            xAxis: {
                labels: {
                    formatter: function(e) {
                        return Highcharts.dateFormat('%Y', this.value);
                    }
                }
            },
            handles: {
                backgroundColor: '#808080'
            },
            margin:-10,
            height:30
        },
        xAxis: {
            type: 'datetime',
            tickLength: 0,//X轴下标长度
            events: {
                afterSetExtremes: function(e) {
                    var minTime = Highcharts.dateFormat("%Y-%m-%d", e.min);
                    var maxTime = Highcharts.dateFormat("%Y-%m-%d", e.max);
                    var chart = this.chart;
                    showTips(e.min,e.max,chart);
                }
            }
        },
        yAxis: [{
            labels: {
                align: 'left',
                x: -28
            },
            title: {
                enable:false
            },
            height: '70%',
            lineWidth:1,//Y轴边缘线条粗细
            gridLineColor: '#346691',
            gridLineWidth:0.1,
            opposite:false
        },
            {
                title: {
                    enable:false
                },
                top: '75%',
                height: '25%',
                labels:{
                    align: 'left',
                    x:-28
                },
                gridLineColor: '#346691',
                gridLineWidth:0.1,
                lineWidth: 1,
                opposite:false,
                endOnTick:false
            }],
        series: [
            {
                type: 'candlestick',
                id:"candlestick",
                name: result.cname,
                data: ohlcArray
            }
            ,{
                type: 'column',//2
                name: '成交量',
                data: volumeArray,
                yAxis: 1
            } ,{
                type: 'spline',
                name: 'MA5',
                color:'#1aadce',
                data: MA5Array,
                lineWidth:1
            },{
                type: 'spline',
                name: 'MA10',
                data: MA10Array,
                color:'#8bbc21',
                threshold: null,
                lineWidth:1
            },{
                type: 'spline',
                name: 'MA20',
                data: MA20Array,
                color:'#910000',
                threshold: null,
                lineWidth:1
            },{
                type : 'flags',
                cursor:'pointer',
                style:{
                    fontSize: '11px',
                    fontWeight: 'normal',
                    textAlign: 'center'
                },
                lineWidth:0.5,
                onSeries : 'candlestick',
                width : 25,
                shape: 'squarepin'
            },{
                type : 'flags',
                cursor:'pointer',
                y: 33,
                style:{
                    fontSize: '11px',
                    fontWeight: 'normal',
                    textAlign: 'center'
                },
                lineWidth:0.5,
                onSeries : 'candlestick',
                width : 25,
                shape: 'squarepin'
            },
            {
                type: 'spline',
                name: 'VolMA5',
                color:'#1aadce',
                data: VolMA5Array,
                lineWidth:1,
                yAxis: 1
            },{
                type: 'spline',
                name: 'VolMA10',
                data: VolMA10Array,
                color:'#8bbc21',
                threshold: null,
                lineWidth:1,
                yAxis: 1
            },{
                type: 'spline',
                name: 'VolMA20',
                data: VolMA20Array,
                color:'#910000',
                threshold: null,
                lineWidth:1,
                yAxis: 1
            }
        ]
    });
}




//highstock K线图
export let highTimeChart = function(divID,result,yestPrice){
	//开盘价，最高价，收盘价，最低价，成交量,价格变动,涨跌幅,5日均价,,10日均价,20日均价,5日均量,10日均量,20日均量，换手率,当前点离左边的相对距离
	var  time,currentVolume,currentPrice,averagePrice,currentAmount,relativeWidth,minTime,maxTime,breakFrom,breakTo,currentPriceRate,averagePriceRate;
	//定义数组
	var currentVolumeArray = [],currentPriceArray = [],averagePriceArray=[],currentAmountArray=[];


//修改colum条的颜色（重写了源码方法）
	var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
	Highcharts.seriesTypes.column.prototype.drawPoints = function () {
		var merge  = Highcharts.merge,
			series = this,
			chart  = this.chart,
			points = series.points,
			i      = points.length;
		if(chart.series[0].name=='价位'&&chart.series[2].name=='成交量'){
			while (i--) {
				var splinePoint = chart.series[0].points[i].y,splinePointPre;
				if(splinePoint!= undefined){
					if(i==0){
						splinePointPre=yestPrice;
					}
					else{
						splinePointPre = chart.series[0].points[i-1].y;
					}
					var color = (splinePointPre < splinePoint) ? '#DD2200' : '#33AA11';
					var seriesPointAttr = merge(series.pointAttr);
					//seriesPointAttr[''].fill = color;
					//seriesPointAttr.hover.fill = Highcharts.Color(color).brighten(0.3).get();
					//seriesPointAttr.select.fill = color;
				}else{
					var seriesPointAttr = merge(series.pointAttr);
				}
				points[i].pointAttr = seriesPointAttr;
			}
		}
		originalDrawPoints.call(this);
	}


	//常量本地化
	Highcharts.setOptions({
		global : {
			useUTC : false
		},
		lang: {
			rangeSelectorZoom:"",
			loading:'加载中...',
			shortMonths:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
         	weekdays:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		}
	});
	//格式化数据，准备绘图
	let data = result;
	var date=new Date();
	var todayD=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
	minTime=new Date(todayD+' 9:30:00').getTime();
	maxTime=new Date(todayD+' 15:00:00').getTime();

	breakFrom=new Date(todayD+' 11:30:00').getTime();
	breakTo=new Date(todayD+' 13:00:00').getTime();

//	console.log(minTime);
	for (var i = 0; i < data.length; i++) {
		var barTime=data[i].barTime;//计算时间戳
		var barT=todayD+' '+barTime[0]+barTime[1]+':'+barTime[2]+barTime[3]+':00';
		var barTS=new Date(barT).getTime();
		currentPriceArray.push([
			parseInt(barTS),
			parseFloat(data[i].currentPrice)// 价位
         ]);

		averagePriceArray.push([
			parseInt(barTS),
	    	parseFloat(data[i].averagePrice)// 均价
	     ]);
		currentVolumeArray.push([
			parseInt(barTS),// the date
			parseInt(data[i].currentVolume) // 成交量
		]);
		currentAmountArray.push([
			parseInt(barTS),
			parseFloat(data[i].currentAmount)// 金额
		]);
	}

	//开始绘图
	return new Highcharts.StockChart( {
		chart:{
//			width:700,
			height:300,
			renderTo : divID,
			margin: [10, 20,30, 50],
			plotBorderColor: '#3C94C4',
			plotBorderWidth: 0.3,
			animation:false
		},
		loading: {
	    	labelStyle: {
                position: 'relative',
	            top: '10em',
	            zindex:1000
	    	}
	    },
		credits:{
	            enabled:false
		 },
	    rangeSelector: {
			enabled: false
	    },
		plotOptions: {//去掉曲线的hover事件
			series: {
				dataGrouping: {
					enabled: false
				},
				states: {
					hover: {
						enabled: false
					}
				},
				line: {
					marker: {
						enabled: false
					}
				}
			}
		},
	    //格式化悬浮框
	    tooltip: {
			formatter: function() {
				if(this.y == undefined){
					return;
				}
				currentPrice = this.points[0].y;
				averagePrice = this.points[1].y;
				currentVolume = this.points[2].y;
				//currentAmount = this.points[3].y;
				var tip= '<b>'+ Highcharts.dateFormat('%H:%M', this.x) +'</b><br/>';
				if(isNaN(currentPrice)){
					tip += '价位：<span>--</span><br/>';
				}
				else{
					if(currentPrice>yestPrice){
						currentPriceRate='+'+((parseFloat(currentPrice)-parseFloat(yestPrice))/parseFloat(yestPrice)*100).toFixed(2)+'%';
						tip += '价位：<span style="color: #DD2200;">'+currentPrice+'('+currentPriceRate+')'+'</span><br/>';
					}
					else{
						currentPriceRate='-'+((parseFloat(yestPrice)-parseFloat(currentPrice))/parseFloat(yestPrice)*100).toFixed(2)+'%';
						tip += '价位：<span style="color: #33AA11;">'+currentPrice+'('+currentPriceRate+')'+' </span><br/>';
					}
				}
				if(isNaN(averagePrice)){
					tip += '均价：<span>--</span><br/>';
				}
				else{
					if(averagePrice>yestPrice){
						averagePriceRate='+'+((parseFloat(averagePrice)-parseFloat(yestPrice))/parseFloat(yestPrice)*100).toFixed(2)+'%';
						tip += '均价：<span style="color: #DD2200;">'+averagePrice+'('+averagePriceRate+')'+' </span><br/>';
					}
					else{
						averagePriceRate='-'+((parseFloat(yestPrice)-parseFloat(averagePrice))/parseFloat(yestPrice)*100).toFixed(2)+'%';
						tip += '均价：<span style="color: #33AA11;">'+averagePrice+'('+averagePriceRate+')'+' </span><br/>';
					}
				}

				tip += '成交量：<span>'+currentVolume+'万股 </span><br/>';


				return tip;
			},
		   crosshairs: {
   				dashStyle: 'dash'
		   },
   			borderColor:	'white',
	    	positioner: function () { //设置tips显示的相对位置
	    		var halfWidth = this.chart.chartWidth/2;//chart宽度
	    		var width = this.chart.chartWidth-155;
	    		var height = this.chart.chartHeight/5-8;//chart高度
	    		if(relativeWidth<halfWidth){
	    			return { x: width, y:height };
	    		}else{
	    			return { x: 30, y: height };
	    		}
	    	},
	    	shadow: false
		},
	    title: {
	        enabled:false
	    },
	    exporting: {
            enabled: false  //设置导出按钮不可用
        },
		scrollbar: {
			enabled: false
		},
		navigator: {
			enabled: false
		},
	    xAxis: {
			type: 'dateTime',
			min:minTime,
			max:maxTime,
			ordinal:false,
			units: [['minute', [30]]],
			breaks:[{
				from:breakFrom,
				to:breakTo
			}]
    	},
	    yAxis: [{
	    	 labels: {
                 align: 'left',
                 x: -28
             },
	        title: {
	           enable:false
	        },
			plotLines: [{
				value: yestPrice,
				color: '#DD2200',
				dashStyle: 'longdash',
				width: 1,
				label: {
					text: '0.00%',

					align: 'right',
					//y: 12,
					x: 20,
					style:{
						color:'#999'
					}
				}
			}],
	        height: '70%',
	        lineWidth:1,//Y轴边缘线条粗细
            gridLineColor: '#346691',
            gridLineWidth:0.1,
            opposite:false
	    }, {

	        title: {
	           //enable:false
				text:'(万)',
				align: 'low',
				rotation: 0,
				x:-22,
				y:10
	        },
	        top: '75%',
	        height: '25%',
	        labels:{
	        	align: 'left',
	        	x:-28
	        },
            gridLineWidth:0.1,
	        lineWidth: 1,
	        opposite:false,
	        endOnTick:false
	    }],
	    series: [{
	        type: 'spline',
	        name: '价位',
	        color:'#2d95f9',
	        data: currentPriceArray,
	        lineWidth:1
	    },{
	        type: 'spline',
	        name: '均价',
	        data: averagePriceArray,
	        color:'#fe9e0f',
	        threshold: null,
	        lineWidth:1
	    },{
			type: 'column',//2
			color:'#2d95f9',
			name: '成交量',
			data: currentVolumeArray,
			yAxis: 1,
			pointWidth:1
		}
	    ]
	});
};
