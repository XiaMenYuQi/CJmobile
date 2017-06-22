<template>
    <div>
      <mt-header title="行情">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content">
        <!--搜索框-->
        <search></search>
        <!--指数-->
        <stockMarket :marketData="stockData.marketData"></stockMarket>
        <!--板块-->
        <div class="aui-list market-theme bg-white">
          <!--领涨板块-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>领涨板块</div>
                <router-link to="/market/list/0" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix  aui-hide market-theme-item-con aui-padded-b-15">
              <div class="aui-col-xs-4 item-box" v-for="item in stockData.riseDropPlateData.rise">
                <router-link :to="'/market/index/' + item.stock.code">
                <div>{{item.name}}</div>
                <div class="red">{{item.changePercent}}%</div>
                <div class="small-text1">{{item.stock.name }}<br />{{item.stock.changePercent}}%</div>
                </router-link>
              </div>
            </div>
          </div>
          <!--领跌板块-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>领跌板块</div>
                <router-link to="/market/list/1" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix  aui-hide market-theme-item-con aui-padded-b-15">
              <div class="aui-col-xs-4 item-box" v-for="item in stockData.riseDropPlateData.drop">
                <router-link :to="'/market/index/' + item.stock.code">
                <div>{{item.name}}</div>
                <div class="green">{{item.changePercent}}%</div>
                <div class="small-text1">{{item.stock.name }}<br />{{item.stock.changePercent}}%</div>
                </router-link>
              </div>
            </div>
          </div>
          <!--新股数据-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>新股推荐</div>
                <router-link to="/market/list/2" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix aui-hide market-theme-item-con rank-list">
              <div class="rank-item clearfix" v-for="item in stockData.newStockData">
                <router-link :to="'/market/index/' + item.code">
                <div class="aui-col-xs-4 ">
                  <div class="aui-ellipsis-1">{{item.name}}</div>
                  <span class="small-text1">{{item.code}}</span>
                </div>
                <div class="aui-col-xs-4 red">{{item.price==""?"--":item.price}}</div>
                <div class="aui-col-xs-4" >{{item.circulation}}</div>
                </router-link>
              </div>
            </div>
          </div>
          <!--个股涨幅榜-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>个股涨幅榜</div>
                <router-link to="/market/list/3" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix aui-hide market-theme-item-con rank-list">
              <div class="rank-item clearfix" v-for="item in stockData.riseDropStockData.rise">
                <router-link :to="'/market/index/' + item.code">
                <div class="aui-col-xs-4 ">
                  <div class="aui-ellipsis-1">{{item.name}}</div>
                  <span class="small-text1">{{item.code}}</span>
                </div>
                <div class="aui-col-xs-4 red">{{item.currentPrice}}</div>
                <div class="aui-col-xs-4 red" >{{item.changePercent}}%</div>
                </router-link>
              </div>
            </div>
          </div>
          <!--个股跌幅榜-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>个股跌幅榜</div>
                <router-link to="/market/list/4" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix aui-hide market-theme-item-con rank-list">
              <div class="rank-item clearfix" v-for="item in stockData.riseDropStockData.drop">
                <router-link :to="'/market/index/' + item.code">
                <div class="aui-col-xs-4 ">
                  <div class="aui-ellipsis-1">{{item.name}}</div>
                  <span class="small-text1">{{item.code}}</span>
                </div>
                <div class="aui-col-xs-4 green">{{item.currentPrice}}</div>
                <div class="aui-col-xs-4 green" >{{item.changePercent}}%</div>
                </router-link>
              </div>
            </div>
          </div>
          <!--个股资金净流入榜-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>个股资金净流入榜</div>
                <router-link to="/market/list/5" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix aui-hide market-theme-item-con rank-list">
              <div class="rank-item clearfix" v-for="item in stockData.moneyInOutData.in">
                <router-link :to="'/market/index/' + item.stock.code">
                <div class="aui-col-xs-4 aui-padded-l-15">
                  <div class="aui-ellipsis-1">{{item.stock.name}}</div>
                  <span class="small-text1">{{item.stock.code}}</span>
                </div>
                <div class="aui-col-xs-4" :class="item.stock.changePercent>0?'red':'green'">{{item.stock.currentPrice}}</div>
                <div class="aui-col-xs-4" :class="item.stock.changePercent>0?'red':'green'">{{item.stock.changePercent}}%</div>
                </router-link>
              </div>
            </div>
          </div>
          <!--个股资金净流出榜-->
          <div class=" market-theme-item">
            <div class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title"><span class="icon-img icon-box icon-ani aui-margin-r-5"></span>个股资金净流出榜</div>
                <router-link to="/market/list/6" class="aui-list-item-right aui-padded-t-b-10"><span class="icon-img icon-more"></span></router-link>
              </div>
            </div>
            <div class="clearfix aui-hide market-theme-item-con rank-list">
              <div class="rank-item clearfix" v-for="item in stockData.moneyInOutData.out">
                <router-link :to="'/market/index/' + item.stock.code">
                <div class="aui-col-xs-4 aui-padded-l-15">
                  <div class="aui-ellipsis-1">{{item.stock.name}}</div>
                  <span class="small-text1">{{item.stock.code}}</span>
                </div>
                <div class="aui-col-xs-4" :class="item.stock.changePercent>0?'red':'green'">{{item.stock.currentPrice}}</div>
                <div class="aui-col-xs-4" :class="item.stock.changePercent>0?'red':'green'">{{item.stock.changePercent}}%</div>
                </router-link>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters, mapActions } from 'vuex'
  import stockMarket from "./stockMarket"
  import search from "./search"

  export default {
    name: 'market',
    components: {
      stockMarket,search
    },
    computed: mapGetters({
      stockData: 'stockData'
    }),
    filters : {

    },
    created () {
      this.$store.dispatch('getStockCenterData');
    },
    updated (){
      $('.market-theme-item').on('click',function(){
        let itemCon = $(this).find('.market-theme-item-con');
        let iconBox = $(this).find('.icon-box');
        itemCon.toggleClass('aui-hide');
        iconBox.toggleClass('show');
      })
    }
  }
</script>
