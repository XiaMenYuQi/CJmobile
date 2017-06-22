
import Vue from 'vue'
import Router from 'vue-router'

import index from '../components/index' //首页
import market from '../components/market/market'  //行情
import marketList from '../components/market/marketList'  //行情列表
import marketIndex from '../components/market/marketIndex'  //股票详情
import marketIndex2 from '../components/market/marketIndex2'  //指数详情
import newsIndex from '../components/news/newsIndex'  //新闻页
import newsList from '../components/news/newsList'  //新闻列表（要闻，银行等等）
import news24 from '../components/news/news24'   //新闻列表 7*24小时
import newsDetail from '../components/news/newsDetail'  //新闻详情
import newsComment from '../components/news/newsComment' //新闻评论
import userStock from '../components/user/userStock'   //自选股
import userStockManger from '../components/user/userStockManger'  //自选管理
import userCenter from '../components/user/userCenter'   //用户中心
import userEdit from '../components/user/userEdit'  //个人资料
import userCollect from '../components/user/userCollect' //新闻收藏
import userMessage from '../components/user/userMessage' //站内消息
import login from '../components/user/login' //登陆
import register from '../components/user/register' //注册
import userAgree from '../components/user/userAgree' //用户协议
import forgetPassword from '../components/user/forgetPassword' //忘记密码
import liveList from '../components/live/liveList' //直播列表
import liveIndex from '../components/live/liveIndex' //直播详情

Vue.use(Router);

//配置路由地址
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/market',
      name: 'market',
      component: market
    },
    {
      path: '/market/list/:id',
      name: 'marketList',
      component: marketList
    },
    {
      path: '/market/index/:code',
      name: 'marketIndex',
      component: marketIndex
    },
    {
      path: '/market/:code',
      name: 'marketIndex2',
      component: marketIndex2
    },
    {
      path: '/news',
      name: 'newsIndex',
      component: newsIndex,
      children: [
        {
          path: '/news/list/:name',
          component: newsList
        },
        {
          path: '/news/news24',
          component: news24
        }
      ]
    },
    {
      path: '/:part/:year/:date/:time/:id',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path : '/news/comment/:id',
      name: 'newsComment',
      component: newsComment
    },
    {
      path: '/user/stock',
      name: 'userStock',
      component: userStock
    },
    {
      path: '/user/stock/manger',
      name: 'userStockManger',
      component: userStockManger
    },
    {
      path: '/user/center',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/user/edit',
      name: 'userEdit',
      component: userEdit
    },
    {
      path: '/user/collect',
      name: 'userCollect',
      component: userCollect
    },
    {
      path: '/user/message',
      name: 'userMessage',
      component: userMessage
    },
    {
      path: '/user/login',
      name: 'login',
      component: login
    },
    {
      path: '/user/register',
      name: 'register',
      component: register
    },
    {
      path: '/user/agreement',
      name: 'userAgree',
      component: userAgree
    },
    {
      path: '/user/forget',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/live/list',
      name: 'liveList',
      component: liveList
    },
    {
      path: '/live/index/:id',
      name: 'liveIndex',
      component: liveIndex
    }
  ]
})
