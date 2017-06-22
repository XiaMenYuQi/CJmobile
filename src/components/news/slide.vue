<template>
  <mt-swipe :auto="4000" class="news-slide">
    <mt-swipe-item v-for="item in slideItemList" :key="item.id">
      <a :href="item.targetUrl" target="_blank">
        <img :src="item.cover | imgUrl" class="slide-img" />
        <div class="aui-slide-con">{{item.title}}</div>
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>
<!--轮播组件-->
<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'mint-ui';

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

	export default {
		name: 'slide',
    props : ['slideItemList'],
		data () {
			return {}
		}
	}
</script>

<style scoped>
  .news-slide {height: 160px;background-color: #f5f5f5;}
  .news-slide .slide-img{width: 100%;height: 100%}
</style>
