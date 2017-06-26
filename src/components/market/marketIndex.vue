<template>
  <div class="stock-index">
    <!--行情数据-->
    <section class="stock-head aui-grid aui-text-white" v-if="stockDetail!=null" :class="stockDetail.changePrice>0?'red-bg':'green-bg'">
      <mt-header :title="stockDetail.name + '(' + stockDetail.code + ')'">
        <mt-button icon="back" slot="left" @click="back" ></mt-button>
        <mt-button slot="right" @click="addUserStock" >加自选</mt-button>
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
              <h4>{{ stockDetail.endTime  | stockTime}}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="aui-row" v-cloak>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-5">
          <h4>开<span>{{ stockDetail.openPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-5">
          <h4>高<span>{{ stockDetail.highPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-5">
          <h4>量<span>{{ stockDetail.volume }}</span>手</h4> <!---->
        </div>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-5">
          <h4>市盈<span>{{ stockDetail.PERatio }}</span></h4>
        </div>
      </div>
      <div class="aui-row" v-cloak>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10">
          <h4>昨<span>{{ stockDetail.lastPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10">
          <h4>低<span>{{ stockDetail.lowPrice }}</span></h4>
        </div>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10">
          <h4>换<span>{{ stockDetail.turnOverRate }}%</span></h4>
        </div>
        <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10">
          <h4>振幅<span>{{ stockDetail.amplitude }}%</span></h4>
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
        <mt-tab-item id="2">盘口数据</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="tabActive2">
        <mt-tab-container-item id="1">
          <div class="aui-grid" v-cloak>
            <div class="aui-row bg1">
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>涨停</p>
                <p>{{ stockDetail.limitUpPrice }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>跌停</p>
                <p>{{ stockDetail.dropStopPrice }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>昨收</p>
                <p>{{ stockDetail.lastPrice }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>今开</p>
                <p>{{ stockDetail.openPrice }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>最低</p>
                <p>{{ stockDetail.lowPrice }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>最高</p>
                <p>{{ stockDetail.highPrice }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>换手率</p>
                <p>{{ stockDetail.turnOverRate }}%</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>市盈率</p>
                <p>{{ stockDetail.PERatio }}</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>成交量</p>
                <p>{{ stockDetail.volume }}万</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1">
                <p>成交额</p>
                <p>{{ stockDetail.turnOverMoney }}万</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>流通值</p>
                <p>{{ stockDetail.CurrentMarket }}亿</p>
              </div>
              <div class="aui-col-xs-3 aui-padded-t-5 aui-padded-b-10 bor-b-1 bor-r-1">
                <p>总市值</p>
                <p>{{ stockDetail.TotalMarket }}亿</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="aui-grid">
            <div class="aui-row bg1">
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">委差</span>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.differ }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">委比</span>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.than }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">卖一</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellOnePrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellOneVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">买一</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyOnePrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyOneVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">卖二</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellTwoPrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellTwoVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">买二</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyTwoPrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyTwoVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">卖三</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellThreePrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellThreeVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">买三</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyThreePrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyThreeVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">卖四</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellFourPrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellFourVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">买四</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyFourPrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyFourVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">卖五</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellFivePrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.sellFiveVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">买五</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyFivePrice }}</span>
                  <span class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.buyFiveVolume }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">外盘</span>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.outer }}</span>
                </p>
              </div>
              <div class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5 bor-b-1">
                <p>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">内盘</span>
                  <span class="aui-col-xs-6 aui-padded-t-5 aui-padded-b-5">{{ stockDetail.inside }}</span>
                </p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </section>
    <!--行情/盘口数据end-->
    <div class="aui-padded-t-15 aui-bg-gray"></div>
    <!--简介资金-->
    <section class="stock-des">
      <mt-navbar v-model="tabActive3">
        <mt-tab-item id="1">公司简介</mt-tab-item>
        <mt-tab-item id="2">个股概况</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="tabActive3">
        <mt-tab-container-item id="1">
          <div class="aui-grid">
            <div class="aui-row bg1" v-if="stockCompany.CompanyIntroduction!=null">
              <h4 class="aui-text-center aui-padded-t-5 aui-padded-b-5 bor-b-1">
                公司名称：{{stockCompany.CompanyIntroduction.name}}
              </h4>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>注册资本：</p>
                <p>{{stockCompany.CompanyIntroduction.capital}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>上市日期：</p>
                <p>{{stockCompany.CompanyIntroduction.listDate}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>发行价：</p>
                <p>{{stockCompany.CompanyIntroduction.issuePrice}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>法人代表：</p>
                <p>{{stockCompany.CompanyIntroduction.legal}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>总经理：</p>
                <p>{{stockCompany.CompanyIntroduction.manager}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>董秘:</p>
                <p>{{stockCompany.CompanyIntroduction.deputySecretaries}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>联系电话：</p>
                <p>{{stockCompany.CompanyIntroduction.telephone}}</p>
              </div>
              <div class="aui-col-xs-8 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>公司网址：</p>
                <p>{{stockCompany.CompanyIntroduction.companyWebsite}}</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="aui-grid">
            <div class="aui-row bg1" v-if="stockCompany.stockBasics!=null">
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>所属地区</p>
                <p>{{stockCompany.stockBasics.area}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>所属行业</p>
                <p>{{stockCompany.stockBasics.industry}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>股东人数</p>
                <p>{{stockCompany.stockBasics.holders}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>流通股本(亿)</p>
                <p>{{stockCompany.stockBasics.outstanding}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>总资产(万)</p>
                <p>{{stockCompany.stockBasics.totalAssets}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>总股本(亿)</p>
                <p>{{stockCompany.stockBasics.totals}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>净利润率(%)</p>
                <p>{{stockCompany.stockBasics.npr}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>市净率(%)</p>
                <p>{{stockCompany.stockBasics.pb}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>销售毛利率</p>
                <p>{{stockCompany.stockBasics.gpr}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>每股收益</p>
                <p>{{stockCompany.stockBasics.esp}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>每股净资产</p>
                <p>{{stockCompany.stockBasics.bvps}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>每股公积金</p>
                <p>1{{stockCompany.stockBasics.reservedPerShare}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>每股未分配</p>
                <p>{{stockCompany.stockBasics.perundp}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>收入同比(%)</p>
                <p>{{stockCompany.stockBasics.rev}}</p>
              </div>
              <div class="aui-col-xs-4 aui-padded-t-5 aui-padded-b-5 bor-b-1 bor-r-1">
                <p>利润同比(%)</p>
                <p>{{stockCompany.stockBasics.profit}}</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </section>
    <!--简介资金end-->
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
        stockCompany : 'stockCompany',
        addStockMsg : 'addStockMsg',
        userLoginInfo : 'userLoginInfo'
      })
    },
    data (){
			return {
				code : this.$route.params.code,
        kType : ['day','week','month'],
        tabActive1 : '1',
        tabActive2 : '1',
        tabActive3 : '1'
      }
    },
    created () {
      this.$store.dispatch('getStockOptional' , this.code);
      this.$store.dispatch('getStockCompany' , this.code);
    },
    methods :{
      addUserStock (){
      	var _this = this;
      	if(_this.userLoginInfo.data.id==null){
          Toast('请先登陆!');
          return;
        }
        MessageBox.confirm('确定加入自选股?').then(({ action }) => {
          //确定
          _this.$store.dispatch('addUserStock' , {stockCode : _this.stockDetail.code,stockName : _this.stockDetail.name});

        },()=>{
          //取消
          console.log('reject')
        });
      },
      back (){
        window.history.go(-1)
      }
    },
    watch: {
      addStockMsg (){
        Toast(this.addStockMsg.msg);
      },
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
