<template>
    <div class="bg-white">
      <mt-header title="自选股">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <router-link v-if="userLoginInfo.data.id!=null" to="/user/stock/manger" slot="right">
          <mt-button>管理</mt-button>
        </router-link>
        <router-link v-else to="/user/login" slot="right">
          <mt-button>登陆</mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content">
        <!--搜索框-->
        <search></search>
        <!--指数-->
        <stockMarket :marketData="userStock.marketData" v-if="userStock.marketData!=null"></stockMarket>
        <template v-if="userLoginInfo.data.id!=null">
          <!--自选股列表-->
          <div class="market-optional-list rank-list" v-if="userStock.myStock.data.length > 0"  v-infinite-scroll="addMore">
            <div class="market-optional-list-header clearfix">
              <div class="aui-col-xs-4">名称</div>
              <div class="aui-col-xs-4">价格</div>
              <div class="aui-col-xs-4">涨跌幅</div>
            </div>
            <div class="rank-item clearfix" v-for="item in userStock.myStock.data">
              <router-link :to="'/market/index/' + item.code">
                <div class="aui-col-xs-4">
                  <div class="aui-ellipsis-1">{{ item.name }}</div>
                  <span class="small-text">{{ item.code }}</span>
                </div>
                <div class="aui-col-xs-4">{{ item.currentPrice }}</div>
                <div class="aui-col-xs-4"> <div class="aui-btn rank-btn" :class="item.changePrice>=0?'bg-red':'bg-green'">{{ item.changePercent }}</div></div>
              </router-link>
            </div>
          </div>
          <div class="null-data aui-margin-t-15" v-else>
            <img src="/static/image/null-data.png" alt="暂无数据">
            <p class="aui-margin-b-15">您还没有添加自选股<br />快去添加一些吧</p>
            <stockHotList></stockHotList>
          </div>
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
            加载中...
          </p>
        </template>

        <!-- 热门股票-->
        <template v-else>
          <div class="null-data aui-margin-t-15">
            <img src="/static/image/null-data.png" alt="暂无数据">
            <p class="aui-margin-b-15">登陆后才能添加自选股<br />先看看热门股票吧</p>
          </div>
          <stockHotList ></stockHotList>
        </template>

      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import stockMarket from "../market/stockMarket"
  import search from "../market/search"
  import stockHotList from "../market/stockHotList"

  export default {
    name: 'userStock',
    components: {
      stockMarket,search,stockHotList
    },
    computed: mapGetters({
      userStock: 'userStock',
      userLoginInfo : 'userLoginInfo'
    }),
    data() {
      return {
        loading : false,
        pageNo : 0,
        pageSize : 10
      };
    },
    created () {
      this.$store.dispatch('getUserStock', {pageNo : this.pageNo ,pageSize: this.pageSize } );
    },
    methods : {
    	addMore (){
        let totalPage = this.userStock.myStock.totalPage;
        if(this.pageNo + 1 >= totalPage) return;
        this.loading = true;
        this.pageNo = this.pageNo + 1;
        this.$store.dispatch('getUserStock', {pageNo : this.pageNo ,pageSize: this.pageSize });
      }
    },
    watch : {
      userStock (){
      	this.loading = false
      }
    }
  }
</script>

