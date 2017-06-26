
import Vue from 'vue'
import VueResource from 'vue-resource'

import {ctx} from '../baseUrl'
import * as types from '../mutation-types'

import { Indicator , Toast } from 'mint-ui';

Vue.use(VueResource);

// initial state
const state = {
  liveList: {
    data: [],
    totalPage: ''
  },
  liveIndex : {}
};

// getters
const getters = {
  liveList: state => state.liveList,
  liveIndex: state => state.liveIndex
};

// actions
const actions = {
  //获取直播列表
  getLiveList({ commit  } , pageNo) {
    Indicator.open();
    Vue.http.post( ctx +  '/live/page', {'pageNo':pageNo},{emulateJSON:true}).then(response => {
      //console.log(response);
      Indicator.close();
      if( pageNo == 0 ){
        commit(types.INIT_LIVE_LIST);
      }
      commit(types.GET_LIVE_LIST, response.body)

    }, response => {
      errMsg();
      console.log(response);
      // error callback
    });
  },
  getLiveIndex({ commit } , id){
    Indicator.open();
    Vue.http.post( ctx +  '/live/' + id).then(response => {
      //console.log(response);
      Indicator.close();
      commit(types.GET_LIVE_DETAIL, response.body)

    }, response => {
      errMsg();
      console.log(response);
      // error callback
    });
  }
};

// mutations
const mutations = {
  [types.INIT_LIVE_LIST](state){
    state.liveList.data = [];
  },
  [types.GET_LIVE_LIST](state , ret){
    var arr = ret.data.liveList.data;
    var before = state.liveList.data;
    arr.forEach(function(e){
      before.push(e)
    });
    state.liveList.data = before;
    state.liveList.totalPage = ret.data.liveList.totalPage;
  },
  [types.GET_LIVE_DETAIL](state , ret){
    state.liveIndex = ret.data;
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
