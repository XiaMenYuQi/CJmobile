<template>
  <div class="bg-white">
  <!--头部-->
  <header class="aui-bar aui-bar-nav header">
    <router-link to="/" class="aui-pull-left aui-btn red aui-font-size-20 aui-margin-l-15">华闽财经</router-link>
    <router-link v-if="userLoginInfo.data.id == null" class="aui-pull-right aui-btn" to="/user/login">
      <img src="/static/image/login.png" class="aui-img-round">
    </router-link>
    <router-link v-else class="aui-pull-right aui-btn" to="/user/center">
      <img v-if="userLoginInfo.data.cover==null" src="/static/image/default-cover.png" class="aui-img-round">
      <img v-else :src="userLoginInfo.data.cover | imgUrl" class="aui-img-round">
    </router-link>
  </header>

  <div class="aui-content ">
    <div class="index-nav">
      <ul class="clearfix">
        <li><router-link to="/news/list/index">新闻</router-link></li>
        <li><router-link to="/user/stock">自选</router-link></li>
        <li><router-link to="/market">行情</router-link></li>
        <li><router-link to="/live/list">直播</router-link></li>
      </ul>
    </div>
    <slide :slideItemList="slideItemList"></slide>
    <div class="aui-padded-l-r-15">
      <ul class="aui-list news-list" v-infinite-scroll="addMore">
        <li class="aui-list-item aui-img" v-for="item in newsList[0]">
          <div class="aui-list-item-title">
            <div><router-link :to="item.accessUrl | newsUrl">{{item.title}}</router-link></div>
            <span class="small-text aui-margin-t-10">{{item.publishTime}}</span>
          </div>
          <router-link :to="item.accessUrl | newsUrl"><img class="aui-list-item-media" :src="item.cover | imgUrl"></router-link>
        </li>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
          加载中...
        </p>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import slide from "./news/slide"

  export default {
    name: 'index',
    components: {
      slide
    },
    computed: mapGetters({
      newsList: 'newsList',
      userLoginInfo : 'userLoginInfo',
      slideItemList : 'slideItemList'
    }),
    data () {
      return {
        pageNo : 0,
        loading : false
      }
    },
    created () {
    	if(this.userLoginInfo.data.id!=null){
        this.$store.dispatch('getUserInfo');
      }
      this.$store.dispatch('getNewsList', {keyMark:'index',pageNo:this.pageNo});
    },
    methods : {
      addMore (){
        let _this = this;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getNewsList', {keyMark:'index',pageNo:_this.pageNo});
      }
    },
    watch : {
      newsList (){
        this.loading = false;
      }
    }
  }
</script>


<style scoped>
  .aui-btn .aui-img-round{width:1.5rem}
</style>
