<template>
  <div class="stock-index">
    <!--行情数据-->
    <section class="stock-head aui-grid aui-text-white" v-if="stockDetail!=null" :class="stockDetail.changePrice>0?'red-bg':'green-bg'">
      <mt-header :title="stockDetail.name + '(' + stockDetail.code + ')'">
        <mt-button icon="back" slot="left" @click="back" ></mt-button>
      </mt-header>
      <div class="aui-row" v-cloak>
        <div class="aui-col-xs-6">
          <h1>{{stockDetail.currentPrice}}</h1>
        </div>
        <div class="aui-col-xs-6 ">
          <div class="aui-row">
            <div class="aui-col-xs-6 aui-padded-t-0 aui-padded-b-0">
              <h4>{{ stockDetail.changePrice }}</h4>
            </div>
            <div class="aui-col-xs-6 aui-padded-t-0 aui-padded-b-0">
              <h4>{{ stockDetail.changePercent }}</h4>
            </div>
          </div>
          <div class="aui-row">
            <div class="aui-padded-t-0 aui-padded-b-0">
              <h4>{{ stockDetail.endTime | stockTime}}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="aui-row" v-cloak>
        <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">
          <h4>开<span>{{ stockDetail.openPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">
          <h4>高<span>{{ stockDetail.highPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">
          <h4>额<span>{{ stockDetail.turnOverMoney | toFix2 }}</span>亿</h4> <!---->
        </div>
      </div>
      <div class="aui-row" v-cloak>
        <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-10">
          <h4>昨<span>{{ stockDetail.lastPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-10">
          <h4>低<span>{{ stockDetail.lowPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-10">
          <h4>量<span>{{ stockDetail.volume | toFix2}}万手</span></h4>
        </div>
      </div>
    </section>
    <!--行情数据end-->
    <!--分时图数据-->
    <section class="hightchart">
      <mt-navbar v-model="tabActive1">
        <mt-tab-item id="1">分时</mt-tab-item>
        <mt-tab-item id="2">日K</mt-tab-item>
        <mt-tab-item id="3">周K</mt-tab-item>
        <mt-tab-item id="4">月K</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="tabActive1">
        <mt-tab-container-item id="1">
          <div id="container"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div id="container0"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div id="container1"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div id="container2"></div>
        </mt-tab-container-item>
      </mt-tab-container>
    </section>
    <!--分时图数据end-->
    <div class="aui-padded-t-15 aui-bg-gray"></div>
    <!--行情/盘口数据-->
    <section class="stock-data" v-if="stockDetail!=null">
      <mt-navbar v-model="tabActive2">
        <mt-tab-item id="1">行情数据</mt-tab-item>
        <mt-tab-item id="2">市场概括</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="tabActive2">
        <mt-tab-container-item id="1">
          <div class="aui-grid" v-cloak>
            <div class="aui-row bg1">
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>成交量</p>
                <p>{{ stockDetail.volume | toFix2 }}万手</p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>成交额</p>
                <p>{{ stockDetail.turnOverMoney | toFix2 }}亿</p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>昨收</p>
                <p>{{ stockDetail.lastPrice }}</p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>今开</p>
                <p>{{ stockDetail.openPrice }}</p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>最低</p>
                <p>{{ stockDetail.lowPrice }}</p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>最高</p>
                <p>{{ stockDetail.highPrice }}</p>
              </div>

            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="aui-grid" v-cloak>
            <div class="aui-row bg1" v-for="item in marketData">
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p v-if="item.paramCode == 'Rank_A_sh'">沪A</p>
                <p v-else-if="item.paramCode == 'Rank_B_sh'">沪B</p>
                <p v-else-if="item.paramCode == 'Rank_A_sz'">深A</p>
                <p v-else="item.paramCode == 'Rank_B_sz'">深B</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>涨:{{ item.rise }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>平:{{ item.equal }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>跌:{{ item.drop }}</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </section>
    <!--行情/盘口数据end-->
    <div class="aui-padded-t-15 aui-bg-gray"></div>
  </div>
</template>


<script>
  import $ from 'jquery'
  import { mapGetters, mapActions } from 'vuex'
  import { Navbar , TabItem , MessageBox , Toast } from 'mint-ui';

	export default {
		name: 'marketIndex',
    components: {
      Navbar, TabItem
    },
    computed: {
			...mapGetters({
        stockDetail : 'stockDetail',
        marketData : 'marketData'
      })
    },
    filters: {
      toFix2(value){
        if (!value) return '';
        value = value.toString();
        return (value/10000).toFixed(2);
      }
    },
    data (){
			return {
				code : this.$route.params.code,
        kType : ['day','week','month'],
        tabActive1 : '1',
        tabActive2 : '1',
      }
    },
    created () {
      this.$store.dispatch('getStockOptional' , this.code);
    },
    methods :{
      back (){
        window.history.go(-1)
      }
    },
    watch: {
    	tabActive1 (){
    		if(this.tabActive1 == '1'){
          this.$store.dispatch('getStockChart' , {code : this.code});
        }else{
    			//0,1,2
          var n = parseInt(this.tabActive1 - 2);
          this.$store.dispatch('getStockChart' , {code : this.code,n : n});

        }
      }
    },
    mounted () {
      window.scrollTo(0,0);
      this.$store.dispatch('getStockChart' , {code : this.code});
    }
	}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .stock-index .mint-header{background-color: rgba(0,0,0,0);color: #fff}
  .stock-index .green-bg{background-image:-webkit-linear-gradient(167deg, #3ED086 50%, #70B7EF 100%);background-image: linear-gradient(167deg, #3ED086 50%, #70B7EF 100%);}
  .stock-index .red-bg{background-image:-webkit-linear-gradient(167deg, #E85546 50%, #FF9E35 100%);background-image: linear-gradient(167deg, #E85546 50%, #FF9E35 100%);}
  .stock-index .bg1{background: #F2F9FD;}
  .stock-index .stock-head h4>span{padding-left: .2rem;}

  .stock-index .mint-navbar .mint-tab-item{width: 100%;height: 2rem;padding: 13px 0;overflow: hidden;font-size: 0.7rem;}
  .mint-navbar .mint-tab-item.is-selected{color: #585858;border-bottom: 2px solid #E85546;font-weight: bold;}
  .stock-index .aui-tab-item{color: #7B7B7B;}
  .stock-index .hightchart .tab-content{position: relative}
  .stock-index .hightchart .tab-content .chart-loading{position: absolute;width: 100%;height: 100%;left: 0;right: 0;top: 0;bottom: 0;background-color: rgba(255,255,255,0.4)}
  .stock-index .hightchart .tab-content .chart-loading>img{width: 100px;position: absolute;left: 50%;margin-left: -50px;top: 50%;}
  .stock-index .stock-des h4{min-height: 2rem;line-height: 2rem;}
  .stock-index .stock-des .fund-chart{width: 100%;height: 200px;}
  #container,#container0,#container1,#container2{width: 100%;}
  .stock-index .hightchart{min-height: 340px;}
</style>
