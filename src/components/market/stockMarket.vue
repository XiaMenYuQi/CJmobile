<template>
  <div class="clearfix market-banner bg-white aui-margin-b-10">
    <div class="aui-col-xs-6">
      <div class="market-banner-item">
        <router-link to="/market/sh000001">
        <img src="../../../static/image/img1.jpg">
        <div class="market-banner-item-con aui-padded-l-15 aui-padded-t-15" v-if="marketData.marketSH!=null">
          <div class="aui-font-size-16">{{marketData.marketSH.name}}</div>
          <div :class="marketData.marketSH.changePrice > 0?'red':'green'" class="aui-font-size-20">
            <span :class="marketData.marketSH.changePrice > 0?'':'down'" class="icon-img icon-triangle"></span>{{marketData.marketSH.currentPrice}}
          </div>
          <div class="aui-font-size-12">
            <span class="aui-margin-r-5">{{marketData.marketSH.changePrice}}</span>
            <span>{{marketData.marketSH.changePercent}}</span>
          </div>
        </div>
        </router-link>
      </div>
    </div>
    <div class="aui-col-xs-6">
      <div class="market-banner-item">
        <router-link to="/market/sz399001">
        <img src="../../../static/image/img2.jpg">
        <div class="market-banner-item-con aui-padded-l-15 aui-padded-t-15" v-if="marketData.marketSZ!=null">
          <div class="aui-font-size-16">{{marketData.marketSZ.name}}</div>
          <div :class="marketData.marketSZ.changePrice > 0?'red':'green'" class="aui-font-size-20">
            <span :class="marketData.marketSZ.changePrice > 0?'':'down'" class="icon-img icon-triangle"></span>{{marketData.marketSZ.currentPrice}}
          </div>
          <div class="aui-font-size-12">
            <span class="aui-margin-r-5">{{marketData.marketSZ.changePrice}}</span>
            <span>{{marketData.marketSZ.changePercent}}</span>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'stockMarket',
    props: ['marketData'],
		data () {
			return {}
		}
	}
</script>
