<template>
    <div class="bg-white">
      <mt-header :title="title[id]">
        <router-link to="/market" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content" style="height: 100%" >
        <!--榜单-->
        <div class="rank-list aui-font-size-14" v-infinite-scroll="addMore">
          <div class="rank-header clearfix">
            <div class="aui-col-xs-4 aui-padded-l-15">{{ module[id][0] }}</div>
            <div class="aui-col-xs-4 aui-text-center">{{ module[id][1] }}</div>
            <div class="aui-col-xs-4 aui-text-right aui-padded-r-15">{{ module[id][2] }}</div>
          </div>
          <template v-if="id == 0">
          <div class="rank-item clearfix line-height-40" v-for="item in stockList[0].data">
            <router-link :to="'/market/index/' + item.stock.code">
            <div class="aui-col-xs-4 aui-ellipsis-1">{{ item.name }}</div>
            <div class="aui-col-xs-4">{{ item.stock.name }}</div>
            <div class="aui-col-xs-4 red">{{ item.changePercent }}%</div>
            </router-link>
          </div>
          </template>
          <template v-else-if=" id == 1">
          <div class="rank-item clearfix line-height-40" v-for="item in stockList[1].data">
            <router-link :to="'/market/index/' + item.stock.code">
            <div class="aui-col-xs-4 aui-ellipsis-1">{{ item.name }}</div>
            <div class="aui-col-xs-4">{{ item.stock.name }}</div>
            <div class="aui-col-xs-4 green">{{ item.changePercent }}%</div>
            </router-link>
          </div>
          </template>
          <template v-else-if=" id == 2">
          <div class="rank-item clearfix line-height-40" v-for="item in stockList[2].data">
            <router-link :to="'/market/index/' + item.code">
            <div class="aui-col-xs-4 aui-ellipsis-1">{{ item.name }}</div>
            <div class="aui-col-xs-4 red">{{ item.price==''?'--':item.price }}</div>
            <div class="aui-col-xs-4 ">{{ item.circulation==''?'--': item.circulation }}</div>
            </router-link>
          </div>
          </template>
          <template v-else-if=" id == 3">
            <div class="rank-item clearfix line-height-40" v-for="item in stockList[3].data">
              <router-link :to="'/market/index/' + item.code">
              <div class="aui-col-xs-4 aui-ellipsis-1">{{ item.name }}</div>
              <div class="aui-col-xs-4">{{ item.currentPrice==''?'--':item.currentPrice }}</div>
              <div class="aui-col-xs-4 red">{{ item.changePercent==''?'--': item.changePercent + '%' }}</div>
              </router-link>
            </div>
          </template>
          <template v-else-if=" id == 4">
            <div class="rank-item clearfix line-height-40" v-for="item in stockList[4].data">
              <router-link :to="'/market/index/' + item.code">
              <div class="aui-col-xs-4 aui-ellipsis-1">{{ item.name }}</div>
              <div class="aui-col-xs-4">{{ item.currentPrice==''?'--':item.currentPrice }}</div>
              <div class="aui-col-xs-4 green">{{ item.changePercent==''?'--': item.changePercent + '%' }}</div>
              </router-link>
            </div>
          </template>
          <template v-else-if=" id == 5 || id == 6">
            <div class="rank-item clearfix line-height-40" v-for="item in stockList[5].data">
              <router-link :to="'/market/index/' + item.stock.code">
              <div class="aui-col-xs-4 aui-ellipsis-1">{{ item.stock.name }}</div>
              <div class="aui-col-xs-4">{{ item.stock.currentPrice==''?'--':item.stock.currentPrice }}</div>
              <div class="aui-col-xs-4" :class="item.stock.changePercent>0?'red':'green'">{{ item.stock.changePercent==''?'--': item.stock.changePercent }}</div>
              </router-link>
            </div>
          </template>
        </div>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
          加载中...
        </p>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'marketList',
    computed: mapGetters({
      stockList: 'stockList'
    }),
		data () {
			return {
				title: ['领涨板块','领跌板块','新股推荐','个股涨幅榜','个股跌幅榜','个股资金净流入榜','个股资金净流出榜'],//2,5,6没翻页
        module : [['名称','领涨股','涨跌幅'],['名称','领跌股','涨跌幅'],['名称','发行价','发行量'],['名称','当前价','涨跌幅'],
          ['名称','当前价','涨跌幅'],['名称','当前价','涨跌幅'],['名称','当前价','涨跌幅']],
        id : this.$route.params.id,
        pageNo : 1,
        loading : false

      }
		},
    created () {
      this.$store.dispatch('getStockListData', { id : this.id ,pageNo : this.pageNo,init: true});
    },
    methods : {
      addMore (){
      	let _this = this;
        if(_this.id == 0 || _this.id == 1|| _this.id == 3 || _this.id == 4) {
          let _this = this;
          _this.pageNo = _this.pageNo + 1;
          _this.$store.dispatch('getStockListData', {id: _this.id, pageNo: _this.pageNo, init: false});
        }
      }
    },
    watch : {
      stockList (){
        this.loading = false
      }
    }
	}
</script>
