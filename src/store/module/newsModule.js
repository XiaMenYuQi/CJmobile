import Vue from 'vue'
import VueResource from 'vue-resource'

import {ctx} from '../baseUrl'
import * as types from '../mutation-types'

import { Indicator , Toast } from 'mint-ui';

Vue.use(VueResource);

// initial state
const state = {
  category: [
    {
      name : '要闻',
      en : 'index',
      url : '/news/list/index',
      isShow : true
    },{
      name : '7*24小时',
      en : '',
      url : '/news/news24',
      isShow : true
    },{
      name : '银行',
      en : 'bank',
      url : '/news/list/bank',
      isShow : true
    },{
      name : '期货',
      en : 'futures',
      url : '/news/list/futures',
      isShow : true
    },{
      name : '基金',
      en : 'fund',
      url : '/news/list/fund',
      isShow : true
    },{
      name : '股票',
      en : 'stock',
      url : '/news/list/stock',
      isShow : false
    },{
      name : '保险',
      en : 'insurance',
      url : '/news/list/insurance',
      isShow : false
    },{
      name : '黄金',
      en : 'gold',
      url : '/news/list/gold',
      isShow : false
    },{
      name : '债券',
      en : 'bond',
      url : '/news/list/bond',
      isShow : false
    },{
      name : '外汇',
      en : 'foreignExchange',
      url : '/news/list/foreignExchange',
      isShow : false
    },{
      name : '能源',
      en : 'energy',
      url : '/news/list/energy',
      isShow : false
    },{
      name : '理财',
      en : 'finances',
      url : '/news/list/finances',
      isShow : false
    },{
      name : '信托',
      en : 'trust',
      url : '/news/list/trust',
      isShow : false
    },{
      name : '城市',
      en : 'city',
      url : '/news/list/city',
      isShow : false
    }
  ],
  newsList: [[],[],[],[],[],[],[],[],[],[],[],[]],
  slideItemList : [],
  news24List:{
    data : [],
    totalPage : ''
  },
  newsDetail : {},
  newsComment : {
    data : [],
    totalPage : ''
  }
};

// getters
const getters = {
  category: state => state.category,
  newsList: state => state.newsList,
  slideItemList : state => state.slideItemList,
  news24List : state => state.news24List,
  newsDetail : state => state.newsDetail,
  newsComment : state => state.newsComment
};

// actions
const actions = {
  //获取首页新闻数据
  getNewsList({ commit  } , {keyMark , pageNo}) {
    Indicator.open();
    Vue.http.post( ctx +  '/news/' + keyMark , {'pageNo':pageNo},{emulateJSON:true}).then(response => {
      Indicator.close();
      //console.log(response);
      if(response.ok) {
        if(pageNo == 0){
          commit(types.GET_NEWS_LIST,  { data: response.body,keyMark : keyMark})
        }else{
          commit(types.GET_NEWS_LIST_PUSH, { data: response.body,keyMark : keyMark});
        }

      }
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //获取7*24小时新闻列表
  getNews24List({ commit },pageNo){
    Indicator.open();
    Vue.http.post( ctx + '/live724',{pageNo:pageNo},{emulateJSON:true}).then(response =>{
      //console.log(response);
      if(response.ok){
        Indicator.close();
        if( pageNo == 0 ){
          commit(types.INIT_NEWS24_LIST);
        }
        commit(types.GET_NEWS24_LIST, response.body);
      }
    },response => {
      console.log(response);
      errMsg();
      // error callback
    })
  },
  //获取新闻详情
  getNewsDetail({ commit } , id){
    Indicator.open();
    Vue.http.get( ctx + '/news/detail/' + id).then(response =>{
      //console.log(response);
      if(response.ok){
        Indicator.close();
        commit(types.GET_NEWS_DETAIL, response.body);
      }
    },response => {
      console.log(response);
      errMsg();
      // error callback
    })
  },
  //获取评论列表
  getCommentList({ commit } , { id : id , pageNo : pageNo}){
    Indicator.open();
    Vue.http.post( ctx +  '/user/comment/0/' + id , {
      pageNo : pageNo,
      pageSize : 10
    },{emulateJSON:true}).then(response => {
      Indicator.close();
      if( pageNo == 0 ){
        commit(types.INIT_NEWS_COMMENT);
      }
      commit(types.GET_NEWS_COMMENT, response.body)
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  }

};

// mutations
const mutations = {
    [types.GET_NEWS_LIST](state , ret){
      var n;
      switch (ret.keyMark){
        case 'index':
          n = 0;
          break;
        case 'bank':
          n = 1;
          break;
        case 'futures':
          n = 2;
          break;
        case 'fund':
          n = 3;
          break;
        case 'stock':
          n = 4;
          break;
        case 'insurance':
          n = 5;
          break;
        case 'gold':
          n = 6;
          break;
        case 'bond':
          n = 7;
          break;
        case 'foreignExchange':
          n = 8;
          break;
        case 'energy':
          n = 9;
          break;
        case 'finances':
          n = 10;
          break;
        case 'trust':
          n = 11;
          break;
        case 'city':
          n = 12;
          break;
      }
      Vue.set(state.newsList,n,ret.data.data.newsList.data);
      state.slideItemList = ret.data.data.slideItemList;
    },
    [types.GET_NEWS_LIST_PUSH](state , ret){
      var arr = ret.data.data.newsList.data;
      var n;
      switch (ret.keyMark){
        case 'index':
          n = 0;
          break;
        case 'bank':
          n = 1;
          break;
        case 'futures':
          n = 2;
          break;
        case 'fund':
          n = 3;
          break;
        case 'stock':
          n = 4;
          break;
        case 'insurance':
          n = 5;
          break;
        case 'gold':
          n = 6;
          break;
        case 'bond':
          n = 7;
          break;
        case 'foreignExchange':
          n = 8;
          break;
        case 'energy':
          n = 9;
          break;
        case 'finances':
          n = 10;
          break;
        case 'trust':
          n = 11;
          break;
        case 'city':
          n = 12;
          break;
      }
      var before = state.newsList[n];
      for(var i = 0;i<arr.length;i++){
        before.push(arr[i]);
      }
      Vue.set(state.newsList,n,before)
    },
    [types.INIT_NEWS24_LIST](state){
      state.news24List.data = [];
    },
    [types.GET_NEWS24_LIST](state , ret){
      var arr = ret.data.live724List.data;
      var before = state.news24List.data;
      arr.forEach(function(e){
        before.push(e)
      });
      state.news24List.data = before;
      state.news24List.totalPage = ret.data.live724List.totalPage;
    },
    [types.GET_NEWS_DETAIL](state , ret){
      state.newsDetail = ret.data;
    },
    [types.INIT_NEWS_COMMENT](state ,  ret){
      state.newsComment.data = []
    },
    [types.GET_NEWS_COMMENT](state , ret){
      var arr = ret.data.userCommentList.data;
      var before = state.newsComment.data;
      arr.forEach(function(e){
        before.push(e)
      });
      state.newsComment.data = before;
      state.newsComment.totalPage = ret.data.userCommentList.totalPage;
    }
};



//新闻模块
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
