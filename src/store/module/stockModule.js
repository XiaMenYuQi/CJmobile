import Vue from 'vue'
import VueResource from 'vue-resource'

import {ctx} from '../baseUrl'
import * as types from '../mutation-types'
import { highTimeChart , highStockChart } from"../../../static/js/stock/timeChart.js"

import { Indicator , Toast } from 'mint-ui';

Vue.use(VueResource);

// initial state
const state = {
  stockData: {
    marketData : {//大盘数据

    },
    riseDropPlateData : {//领涨/跌板块数据
      drop : {},
      down : {}
    },
    newStockData : {//新股数据

    },
    riseDropStockData : {//领涨/跌个股数据
      drop: {},
      rise: {}
    },
    moneyInOutData : {//个股资金流入/出数据
      in : {},
      out : {}
    }
  },
  stockList : [[],[],[],[],[],[],[]],
  stockSearch : {},
  stockIndex : {
    stockDetail : {},
    stockCompany: {},
    marketData : {}
  },
  stockHotList : {}
};

// getters
const getters = {
  stockData: state => state.stockData,
  stockList: state => state.stockList,
  stockSearch: state => state.stockSearch,
  stockDetail : state => state.stockIndex.stockDetail.stockData,
  stockCompany : state => state.stockIndex.stockCompany,
  marketData : state => state.stockIndex.stockDetail.marketData,
  stockHotList : state => state.stockHotList
};

//列表接口地址
const listType = [
  {url : 'plate',type: 0},
  {url : 'plate',type: 1},
  {url : 'newStock'},
  {url : 'stock',type: 0},
  {url : 'stock',type: 1},
  {url : 'stockMoneyInOut',type: 'in'},
  {url : 'stockMoneyInOut',type: 'out'}
];
//K线图参数
const ktype = ['day','week','month'];

// actions
const actions = {
  //行情中心数据
  getStockCenterData({ commit  } ) {
    Indicator.open();
    Vue.http.post( ctx +  '/market/center').then(response => {
      Indicator.close();
      //console.log(response);
      commit(types.GET_STOCK_INDEX_DATA, response.body)

    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //股票列表
  getStockListData({ commit } , { id : id , pageNo : pageNo,init: init}){
    Indicator.open();
    if( id == 2){
      //新股
      Vue.http.post( ctx +  '/market/' + listType[id].url).then(response => {
        //console.log(response);
        commit(types.GET_STOCK_LIST_DATA, { data: response.body,id : id})
        Indicator.close();
      }, response => {
        console.log(response);
        errMsg();
        // error callback
      });
    }else if( id == 5 || id == 6 ){
      //资金净流入
      Vue.http.post( ctx +  '/market/' + listType[id].url , {direction: listType[id].type},{emulateJSON:true}).then(response => {
        //console.log(response);
        commit(types.GET_STOCK_LIST_DATA, { data: response.body,id : id})
        Indicator.close();
      }, response => {
        console.log(response);
        errMsg();
        // error callback
      });
    }else{
      //板块个股涨跌
      Vue.http.post( ctx +  '/market/' + listType[id].url , {type: listType[id].type, pageNo : pageNo,pageSize: 10},{emulateJSON:true}).then(response => {
        //console.log(response);
        if(init){
          commit(types.GET_STOCK_LIST_DATA, { data: response.body,id : id})
        }else{
          commit(types.GET_STOCK_LIST_DATA_PUSH,{ data: response.body,id : id})
        }
        Indicator.close();
      }, response => {
        console.log(response);
        errMsg();
        // error callback
      });
    }
  },
  //股票搜索
  searchStock({commit} , keyword){
    Vue.http.post( ctx +  '/optional/findStock', {keyword: keyword} , {emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.SEARCH_STOCK_DATA, response.body)
    }, response => {
      console.log(response);
      // error callback
    });
  },
  searchInit({ commit }){
    commit(types.SEARCH_INIT);
  },
  //股票详情
  getStockOptional({ commit  }, code){
    var type = '';
    if(code.length == 8) {type = 'm';}
    //实时数据
    Vue.http.post( ctx +  '/optional/stock', {
      code: code,
      type: type
    } , {emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.GET_STOCK_OPTIONAL_DATA, response.body)
    }, response => {
      console.log(response);
      // error callback
    });
  },
  getStockChart({ commit }, {code: code , n: n}){
    Indicator.open();
    //console.log(n)
    if(n!=undefined){
      //K线图表数据
      Vue.http.post( ctx +  '/optional/stock/data', {code: code , ktype : ktype[n],count: 500} , {emulateJSON:true}).then(response => {
        //console.log(response);
        commit(types.GET_STOCK_KCHART_DATA, {data: response.body, n: n});
        Indicator.close();
      }, response => {
        console.log(response);
        errMsg();
        // error callback
      });
    }else{
      //分时
      Vue.http.post( ctx +  '/optional/stock/data', {code: code } , {emulateJSON:true}).then(response => {
        //console.log(response);
        commit(types.GET_STOCK_CHART_DATA, response.body);
        Indicator.close();
      }, response => {
        console.log(response);
        errMsg();
        // error callback
      });
    }


  },
  getStockCompany({ commit }, code){
  //股票公司信息
    Vue.http.post( ctx +  '/optional/stock/company', {code: code} , {emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.GET_STOCK_COMPANY_DATA, response.body)
    }, response => {
      console.log(response);
      // error callback
    });
  },
  //热门股票列表
  getStockHotList({ commit }){
    Indicator.open();
    Vue.http.post( ctx +  '/optional/hotStock').then(response => {
      //console.log(response);
      commit(types.GET_STOCK_HOT_LIST, response.body)
      Indicator.close();
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  }
};

// mutations
const mutations = {
  [types.GET_STOCK_INDEX_DATA](state , ret){
    state.stockData = ret.data;
  },
  [types.GET_STOCK_LIST_DATA](state , ret){
    //vue不能检测数据索引赋值
    Vue.set(state.stockList,parseInt(ret.id),ret.data.data)
  },
  [types.GET_STOCK_LIST_DATA_PUSH](state, ret){
    var arr = ret.data.data.data;
    var before = state.stockList[parseInt(ret.id)];
    for(var i = 0;i<arr.length;i++){
      before.data.push(arr[i]);
    }
    Vue.set(state.stockList,parseInt(ret.id),before)
  },
  [types.SEARCH_STOCK_DATA](state,ret){
    state.stockSearch = ret.data;
  },
  [types.SEARCH_INIT](state){
    state.stockSearch = '';
  },
  [types.GET_STOCK_OPTIONAL_DATA](state , ret){
    state.stockIndex.stockDetail = ret.data;
  },
  [types.GET_STOCK_CHART_DATA](state , ret){
    new highTimeChart('container', ret.data.data, state.stockIndex.stockDetail.stockData.lastPrice);//绘制分时图
  },
  [types.GET_STOCK_KCHART_DATA](state , {data, n}){
    new highStockChart('container'+ n,data.data,n);//绘制K线图
  },
  [types.GET_STOCK_COMPANY_DATA](state , ret){
    state.stockIndex.stockCompany = ret.data;
  },
  [types.GET_STOCK_HOT_LIST](state, ret){
    state.stockHotList = ret.data;
  }
};



//行情模块
export default {
  state,
  getters,
  actions,
  mutations
}


function errMsg(){
  Indicator.close();
  Toast({
    message: '请刷新重试！',
    position: 'bottom',
    duration: 3000
  });
}
