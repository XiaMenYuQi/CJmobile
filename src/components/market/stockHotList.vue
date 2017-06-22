<template>
  <div class="market-optional-list rank-list" >
    <div class="market-optional-list-header clearfix">
      <div class="aui-col-xs-4">热门股票</div>
      <div class="aui-col-xs-4">价格</div>
      <div class="aui-col-xs-4">涨跌幅</div>
    </div>
    <div class="rank-item clearfix" v-for="item in stockHotList">
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
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'stockHotList',
    computed: mapGetters({
      stockHotList : 'stockHotList'
    }),
    data() {
      return {

      };
    },
    created () {
      this.$store.dispatch('getStockHotList')
    },
	}
</script>
