var yesPrice;
$(function(){

    var tab1 = new auiTab({
        element:document.getElementById("tab1"),
        index:1,
        repeatClick:false
    },function(ret){
        //console.log(ret);
        var n = ret.index - 2;
        if(n < 0 ){n = 7}
        setHchart(n)
    });
    var tab2 = new auiTab({
        element:document.getElementById("tab2"),
        index:1,
        repeatClick:false
    },function(ret){
        //console.log(ret);
        $('#tab2-con').children().hide().eq(ret.index - 1).show();
    });
    var tab3 = new auiTab({
        element:document.getElementById("tab3"),
        index:1,
        repeatClick:false
    },function(ret){
        //console.log(ret);
        if(ret.index == 3){getMoneyFlow();}
        if(ret.index == 4){stockDetail.getData()}
        if(ret.index == 5){getpanKouChart()}
        $('#tab3-con').children().hide().eq(ret.index - 1).show();
    });

    //头部行情数据
    var headStock = new Vue({
        el: '#headStock',
        data: {
            detail: ''
        },
        created: function(){
            this.getData()
        },
        filters: {
            toFix: function(value){
                if(value==0)return value;
                if (!value) return '';
                value = parseInt(value);
                return (value / 10000).toFixed(2)
            },
            handTime : function(value){
                if(!value) return '';
                value = value.toString();
                var time = value.slice(0,4) + '-' + value.slice(4,6) + '-' + value.slice(6,8) + ' '
                    + value.slice(8,10) + ':' + value.slice(10,12) + ':' + value.slice(12,14);
                return time;
            }
        },
        methods: {
            getData : function(){
                var _this = this;
                getDataFromTX(code , function(ret){
                    //console.log(ret)
                    _this.detail = ret.split("~");
                })
            }
        }
    });

    //行情盘口数据
    var panStock = new Vue({
        el: '#panStock',
        data: {
            detail: ''
        },
        created: function(){
            this.getData();
        },
        filters: {
            toFix: function(value){
                if(value==0)return value;
                if (!value) return '';
                value = parseInt(value);
                return (value / 10000).toFixed(2)
            }
        },
        methods: {
            getData : function(){
                var _this = this;
                getDataFromTX(code , function(ret){
                    //console.log(ret)
                    _this.detail = ret.split("~");
                    yesPrice = _this.detail[4];
                    setHchart(7);
                })
            }
        }
    });

    //逐笔数据
    var stockDetail = new Vue({
        el: '#stockDetail',
        data: {
            detail: ''
        },
        filters: {
            toFix: function(value){
                if(value==0)return value;
                if (!value) return '';
                value = parseInt(value);
                return (value / 10000).toFixed(2)
            }
        },
        methods: {
            getData : function(){
                var _this = this;
                getDataFromTX(code , function(ret){
                    //console.log(ret)
                    var a = [];
                    var arr = ret.split("~");
                    var dataS = arr[29].split("|");
                    //eg.11:04:48/9.23/1/S/923/3974|11:04:45/9.23/100/S/92300/3972
                    for(var i = 0;i<dataS.length;i++){
                        a.push(dataS[i].split("/"))
                    }
                    _this.detail = a;
                })
            }
        }
    });


});

/*
 * 图表相关函数
 * param n 按钮索引
 *       obj 当前按钮对象
 * */
var chart_timer;
function setHchart(n){
    var timePrv,d,time_chart;
    //console.log(n);
    if(n == 7){
        //分时图
        $.ajax({
            type: 'POST',
            url: ctx + "/market/"+ code.slice(2) +"/data",
            dataType: 'json',
            success: function(json){
                //console.log(json);
                if (json.suc) {
                    d=json.data;
                    timePrv= d[d.length-1].barTime;//获取最后一个数据的时间
                    //容器，数据(价位、均价、成交量、金额)，昨日收盘价
                    //console.log(yesPrice)
                    time_chart=new highTimeChart('container', json, yesPrice);//绘制图
                }
            }
        });
        clearInterval(chart_timer);
        chart_timer = setInterval(function (){
            if(parseInt(timePrv)>=parseInt(1530)){
                clearInterval(chart_timer);
                return;
            }
            $.ajax({
                type: 'POST',
                url: ctx + "/market/"+ code.slice(2) +"/data",
                dataType: 'json',
                success: function(json){
                    //console.log(json);
                    if (json.suc) {
                        d=json.data;
                        var data=[];
                        for(var i=d.length-1;i>0;i--){
                            if(d[i].barTime>timePrv){
                                data.push(d[i]);
                            }
                        }
                        addTimeChartPoint(time_chart, data);
                        timePrv= d[d.length-1].barTime;//获取最后一个数据的时间

                    }
                }
            })
        },60000);

    }else{
        $('#chartLoading').show();
        clearInterval(chart_timer);
        //K线图
        //var kType = ['D','W','M','5','15','30','60'];//分别为日K,周K,月K,5,15,30,60分钟
        var kType = ['day','week','month','m5','m15','m30','m60'];//分别为日K,周K,月K,5,15,30,60分钟
        //console.log(kType[n]);
//        $.post(ctx + "/stock/data/hist/data", {'code':code.slice(2), 'ktype':kType[n]}, function(json){
        $.post(ctx + "/market/"+code.slice(2)+"/data", {'code':code.slice(2), 'ktype':kType[n],'count':500}, function(json){
            //console.log(json);
            if(json.suc){
                //_this.retTrade = json;
                //时间戳0，开盘价1，最高价2，收盘价3，最低价4，成交量5,价格变动6,涨跌幅7,5日均价8,,10日均价9,20日均价10,5日均量11,10日均量12,20日均量13，换手率14
                new highStockChart('container',json,n);//绘制K线图
                $('#chartLoading').hide();
            }
        })
    }
}

//分时图追加数据
function addTimeChartPoint(timeChart,d) {//分时图，数据
    var i = 0, series0 = timeChart.series[0],series1 = timeChart.series[1],series2 = timeChart.series[2];
    var date=new Date();
    var todayD=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
    for (i; i < d.length; i++) {
        var barTime = d[i].barTime;//计算时间戳
        var barT = todayD + ' ' + barTime[0] + barTime[1] + ':' + barTime[2] + barTime[3] + ':00';
        var barTS = new Date(barT).getTime();
        series0.addPoint([parseInt(barTS), parseFloat(d[i].currentPrice)], false);
        series1.addPoint([parseInt(barTS), parseFloat(d[i].averagePrice)], false);
        series2.addPoint([parseInt(barTS), parseFloat(d[i].currentVolume)], false);
    }
    timeChart.redraw();
}


/*
 * 腾讯股票接口-资金流向
 * http://web.sqt.gtimg.cn/q=ff_sz000001
 * param code = "sz000001" 股票代码
 * */
function getMoneyFlow(){
    postTX("http://web.sqt.gtimg.cn/q=ff_"+code,function(ret){
        //console.log(ret);
        if (ret) {
            var data = ret.split('~');
            //console.log(data);
            var mostBuy = Number(parseFloat(data[1]/10000).toFixed(2));//1: 主力流入
            var mostSold = Number(parseFloat(data[2]/10000).toFixed(2));//2: 主力流出
            var lessBuy = Number(parseFloat(data[5]/10000).toFixed(2));//1: 散户流入
            var lessSold = Number(parseFloat(data[6]/10000).toFixed(2));//2: 散户流出
            $('#fundChart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        '主力',
                        '散户'
                    ],
                    crosshair: true,
                    tickLength:0
                },
                yAxis: {
                    visible:false
                },
                credits : {
                    enabled: false
                },
                tooltip: {
                    enabled:false
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            align:"right",
                            style:{"color": "#333", "fontSize": "11px", "fontWeight": "normal", "textOutline": "0px 0px contrast" },
                            format:'{y}'
                        }
                    }
                },
                series: [{
                    name: '买入',
                    color : '#db4845',
                    data: [mostBuy, lessBuy]
                }, {
                    name: '卖出',
                    color : '#66b87d',
                    data: [mostSold, lessSold]
                }]
            });
        }
    });
}

/*
 * 腾讯股票接口-盘口分析
 * http://web.sqt.gtimg.cn/q=s_pksz000858
 * param code = "sz000001" 股票代码
 * */
function getpanKouChart(){
    //$.get("http://web.sqt.gtimg.cn/q=s_pk"+code,function(ret){
    postTX("http://web.sqt.gtimg.cn/q=s_pk"+code,function(ret){
//        console.log(ret);
        if (ret) {
            var result = ret.slice(16,ret.length - 3);
            var data = result.split('~');
            //console.log(data);
            var buyB = Number(parseFloat(data[0]*100).toFixed(1));//0: 买盘 大单
            var buyS = Number(parseFloat(data[1]*100).toFixed(1));//1: 买盘 小单
            var SoldB = Number(parseFloat(data[2]*100).toFixed(1));//2: 卖盘 大单
            var SoldS = Number(parseFloat(data[3]*100).toFixed(1));//3: 卖盘 小单
            $('#panKouChart').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        '买盘',
                        '卖盘'
                    ],
                    crosshair: true,
                    tickLength:0,
                    lineWidth:0
                },
                yAxis: {
                    visible:false,
                },
                credits : {
                    enabled: false
                },
                plotOptions: {
                    series: {
//                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            align:"right",
                            style:{"color": "#fff", "fontSize": "11px", "fontWeight": "normal", "textOutline": "0px 0px contrast" },
//                            format:'{y}%'
//                            y:30,
                            format:'{series.name}:{y}%'
                        },
                        colors: ['#db4845','#66b87d']
                    }

                },
                tooltip: {
                    enabled:false
                },
                legend:{
                    enabled:false
                },
                series: [{
                    colorByPoint:true,

                    name: '大单',
                    data: [buyB, SoldB]
                }, {
                    colorByPoint:true,
                    name: '小单',
                    data: [buyS, SoldS]
                }]
            });
        }
    });
}