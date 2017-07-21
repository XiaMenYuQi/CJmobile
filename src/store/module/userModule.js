import Vue from 'vue'
import VueResource from 'vue-resource'

import {ctx} from '../baseUrl'
import * as types from '../mutation-types'

import { Indicator , Toast } from 'mint-ui';

Vue.use(VueResource);

var userData = {};
var userId = '';
if(window.localStorage['CJuserData']!=null){
  userData = JSON.parse(window.localStorage['CJuserData']);
  userId = userData.id;
}

// initial state
const state = {
  userId : userId,
  userLoginInfo : {
    suc : '',
    data : userData,
    msg : ''
  },
  userInfo : {},
  userMessage : {
    data : [],
    totalPage : ''
  },
  userCollect : {
    data : [],
    totalPage : ''
  },
  userCbMsg : {
    userRegisterMsg : {},
    collectDeleteMsg : {},
    collectAddMsg : {},
    collectFlag : false,
    addStockMsg : {},
    deleteStockMsg : {},
    addCommentMsg : {},
    userEditMsg : {},
    sendCodeMsg : {},
    userForgetMsg : {}
  },
  userStock : {
    marketData : {},
    myStock : {
      data : [],
      totalPage : ''
    }
  }
};

// getters
const getters = {
  userLoginInfo : state => state.userLoginInfo,
  userRegisterMsg : state => state.userCbMsg.userRegisterMsg,
  userInfo: state => state.userInfo,
  userEditMsg : state => state.userCbMsg.userEditMsg,
  sendCodeMsg : state => state.sendCodeMsg,
  userForgetMsg : state => state.userForgetMsg,
  userMessage: state => state.userMessage,
  userCollect: state => state.userCollect,
  collectDeleteMsg: state => state.userCbMsg.collectDeleteMsg,
  collectAddMsg: state => state.userCbMsg.collectAddMsg,
  collectFlag: state=> state.userCbMsg.collectFlag,
  addStockMsg : state => state.userCbMsg.addStockMsg,
  deleteStockMsg : state => state.userCbMsg.deleteStockMsg,
  addCommentMsg : state => state.userCbMsg.addCommentMsg,
  userStock : state => state.userStock
};

// actions
const actions = {
  //用户登陆
  userLogin({ commit } , { userName : userName , password : password}){
    //console.log('userName:' + userName + '<br>' +'password:' + password )
    Indicator.open();
    Vue.http.post( ctx +  '/login' , {
      userName : userName ,//用户名
      password : password ,//密码
    },{emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.USER_LOGIN_INFO, response.body);
      Indicator.close();

    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //用户注册
  userRegister({ commit } , { userName : userName , password : password , mobile : mobile,email : email}){
    //console.log('userName:' + userName + '<br>' +'password:' + password + '<br>'+'mobile:' + mobile + '<br>'+'email:' + email + '<br>')
    Indicator.open();
    Vue.http.post( ctx +  '/register' , {
      userName : userName ,//用户名
      password : password ,//密码
      mobile : mobile,//手机号
      email : email//邮箱
    },{emulateJSON:true}).then(response => {
      commit(types.USER_REGISTER_INFO, response.body);
      Indicator.close();
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //获取用户信息
  getUserInfo({ commit  } ) {
    Vue.http.post( ctx +  '/user/' + state.userId).then(response => {
      //console.log(response);
      commit(types.GET_USER_INFO, response.body);
      //同步到登陆信息
      commit(types.USER_LOGIN_INFO, response.body);
    }, response => {
      console.log(response);
      // error callback
    });
  },
  //修改用户信息
  saveUserInfo({ commit } , data){
    Indicator.open();
    Vue.http.post( ctx +  '/user/modify' , {
      id : state.userId,
      nick : data.nick,
      birthday : data.birthday,
      sex : data.sex,
      email : data.email,
      mobile : data.mobile,
      cover : data.cover
    },{emulateJSON:true}).then(response => {
      Indicator.close();
      commit(types.USER_EDIT_INFO, response.body);
      if(response.body.suc){
        commit(types.USER_LOGIN_INFO, response.body);
        commit(types.GET_USER_INFO, response.body);
      }
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //获取短信验证码
  getSendCode({ commit } , mobile){
    //console.log('userName:' + userName + '<br>' +'password:' + password )
    Vue.http.post( ctx +  '/sms/sendcode' , {
      mobile : mobile ,//手机
      type : 2 ,//1 注册  2 找回密码
    },{emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.GET_SEND_CODE, response.body);

    }, response => {
      console.log(response);
      // error callback
    });
  },
  //找回密码
  getUserForget({ commit } , data){
    Indicator.open();
    Vue.http.post( ctx +  '/forget' , {
      mobile : data.mobile,
      password : data.password,
      yzmCode : data.yzmCode,
    },{emulateJSON:true}).then(response => {
      Indicator.close();
      commit(types.GET_USER_FORGET, response.body);
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //获取用户消息
  getUserMessage({ commit } ,pageNo){
    Indicator.open();
    Vue.http.post( ctx +  '/user/notice' , {userId: state.userId, pageNo : pageNo,pageSize : 10 },{emulateJSON:true}).then(response => {
      Indicator.close();
      //console.log(response.body);
        if( pageNo == 0){
          commit(types.INIT_USER_MESSAGE)
        }
        commit(types.GET_USER_MESSAGE, response.body)
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //更新消息状态
  updateUserMessage({ commit } , id){
    //消息状态（0未读 1已读 2删除）
    Vue.http.post( ctx +  '/user/notice/update' , {idStr: id, state : '1' },{emulateJSON:true}).then(response => {
     console.log(response.body)
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //获取新闻收藏列表
  getUserCollect({ commit } ,pageNo){
    Indicator.open();
    Vue.http.post( ctx +  '/user/favorite/news' , {userId: state.userId, pageNo : pageNo,pageSize : 10 },{emulateJSON:true}).then(response => {
      //console.log(response);
      Indicator.close();
      if( pageNo == 0){
        commit(types.INIT_USER_COLLECT)
      }
      commit(types.GET_USER_COLLECT, response.body)
    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //删除收藏新闻
  deleteUserCollect({ commit } , idStr){
    // idStr:收藏id拼接（用，隔开）
    Vue.http.post( ctx +  '/user/favorite/delete' , {userId: state.userId , idStr : idStr},{emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.DELETE_USER_COLLECT, response.body)

    }, response => {
      console.log(response);
      // error callback
    });
  },
  //新增收藏新闻
  addUserCollect({ commit }, {targetId : targetId , type : type}){
    Vue.http.post( ctx +  '/user/favorite/add' , {
      userId : state.userId ,
      targetId : targetId,//收藏id（新闻id或图集id 或 专题id）
      type : type //类型（0新闻 1图集 2专题
    },{emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.ADD_USER_COLLECT, response.body);
      commit(types.CHECK_USER_COLLECT, {data : true});
    }, response => {
      console.log(response);
      // error callback
    });
  },
  //检查是否收藏
  checkUserCollect({ commit }, {targetId : targetId , type : type}){
    Vue.http.post( ctx +  '/user/favorite' , {
      userId : state.userId ,
      targetId : targetId,//收藏id（新闻id或图集id 或 专题id）
      type : type //类型（0新闻 1图集 2专题
    },{emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.CHECK_USER_COLLECT, response.body)
    }, response => {
      console.log(response);
      // error callback
    });
  },
  //增加自选股
  addUserStock({ commit },{ stockCode : stockCode , stockName : stockName}){
    Vue.http.post( ctx +  '/optional/addStock' , {
      userId : state.userId ,
      stockCode : stockCode,//股票代码
      stockName : stockName //股票名称
    },{emulateJSON:true}).then(response => {
      //console.log(response);
      commit(types.ADD_USER_STOCK, response.body)
    }, response => {
      console.log(response);
      // error callback
    });
  },
  //获取自选股
  getUserStock({ commit } , {pageNo : pageNo ,pageSize: pageSize }){
    Indicator.open();
    Vue.http.post( ctx +  '/optional/index' , {
      userId : state.userId,
      pageNo : pageNo,
      pageSize : pageSize
    },{emulateJSON:true}).then(response => {
      Indicator.close();
      //console.log(response)
      if( pageNo == 0){
        commit(types.INIT_USER_STOCK)
      }
      commit(types.GET_USER_STOCK, response.body)

    }, response => {
      console.log(response);
      errMsg();
      // error callback
    });
  },
  //删除自选股
  deleteUserStock({ commit } , code){
    Vue.http.post( ctx +  '/optional/deleteStock' , {
      userId : state.userId,
      code : code
    },{emulateJSON:true}).then(response => {
      commit(types.DELETE_USER_STOCK, response.body)

    }, response => {
      console.log(response);
      // error callback
    });
  },
  //新增评论
  addUserComment({ commit } , { targetId : targetId , content : content}){
    Vue.http.post( ctx +  '/user/comment/add' , {
      userId : state.userId,
      type : 0,//0新闻  1图集
      content : content,
      targetId : targetId
    },{emulateJSON:true}).then(response => {
      commit(types.ADD_NEWS_COMMENT, response.body)

    }, response => {
      console.log(response);
      // error callback
    });
  },
  //退出登陆
  userLogout({ commit }) {
    commit(types.USER_LOGOUT)
  }
};

// mutations
const mutations = {
  [types.USER_LOGIN_INFO](state , ret){
    state.userLoginInfo = ret;
    state.userId = ret.data.id;
    window.localStorage['CJuserData'] = JSON.stringify(ret.data);
  },
  [types.USER_REGISTER_INFO](state , ret){
    state.userCbMsg.userRegisterMsg = ret;
  },
  [types.GET_USER_INFO](state , ret){
    state.userInfo = ret.data;
  },
  [types.USER_EDIT_INFO](state , ret){
    state.userCbMsg.userEditMsg = ret;
  },
  [types.GET_SEND_CODE](state , ret){
    state.userCbMsg.sendCodeMsg = ret;
  },
  [types.GET_USER_FORGET](state , ret){
    state.userCbMsg.userForgetMsg = ret;
  },
  [types.INIT_USER_MESSAGE](state){
    state.userMessage.data = [];
  },
  [types.GET_USER_MESSAGE](state , ret){
    var before = state.userMessage.data;
    var arr = ret.data.data;
    arr.forEach(function(e){
      before.push(e)
    });
    state.userMessage.data = before;
    state.userMessage.totalPage = ret.data.totalPage;
  },
  [types.INIT_USER_COLLECT](state){
    state.userCollect.data = [];
  },
  [types.GET_USER_COLLECT](state , ret){
    var before = state.userCollect.data;
    var arr = ret.data.data;
    arr.forEach(function(e){
      before.push(e)
    });
    state.userCollect.data = before;
    state.userCollect.totalPage = ret.data.totalPage;
  },
  [types.DELETE_USER_COLLECT](state , ret){
    state.userCbMsg.collectDeleteMsg = ret;
  },
  [types.ADD_USER_COLLECT](state , ret){
    state.userCbMsg.collectAddMsg = ret;
  },
  [types.CHECK_USER_COLLECT](state , ret){
    state.userCbMsg.collectFlag = ret.data;
  },
  [types.ADD_USER_STOCK](state , ret){
    state.userCbMsg.addStockMsg = ret;
  },
  [types.GET_USER_STOCK](state , ret){
    state.userStock.marketData = ret.data.marketData;
    if(state.userId == '') return;
    var before = state.userStock.myStock.data;
    var arr = ret.data.myStock.data;
    arr.forEach(function(e){
      before.push(e)
    });
    state.userStock.myStock.data = before;
    state.userStock.myStock.totalPage = ret.data.myStock.totalPage;

  },
  [types.INIT_USER_STOCK](state){
    state.userStock = {
      marketData : {},
      myStock : {
        data : [],
        totalPage : ''
      }
    }
  },
  [types.DELETE_USER_STOCK](state,ret){
    state.userCbMsg.deleteStockMsg = ret;
    state.userCbMsg.deleteStockMsg.suc = false; //已防第二次删的时候状态未改变
  },
  [types.ADD_NEWS_COMMENT](state , ret){
    state.userCbMsg.addCommentMsg = ret;
    state.userCbMsg.addCommentMsg.suc = false;
  },
  [types.USER_LOGOUT](state){
    localStorage.clear();
    state.userId = '';
    state.userLoginInfo.data = {}
   }
};



//用户模块
export default {
  state,
  getters,
  actions,
  mutations
}


function errMsg(){
  Indicator.close();
  Toast({
    message: '请重试！',
    position: 'bottom',
    duration: 3000
  });
}
