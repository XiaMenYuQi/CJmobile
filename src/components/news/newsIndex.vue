<template>
  <div class="bg-white">
    <!--头部-->
      <header class="aui-bar aui-bar-nav header">
        <router-link class="aui-pull-left aui-btn" to="/">
          <span class="icon-img icon-back"></span>
        </router-link>
        <div class="aui-title">新闻</div>
        <router-link v-if="userLoginInfo.data.id == null" class="aui-pull-right aui-btn" to="/user/login">
          <img src="/static/image/login.png" class="aui-img-round">
        </router-link>
        <router-link v-else class="aui-pull-right aui-btn" to="/user/center">
          <img v-if="userLoginInfo.data.cover==null" src="/static/image/default-cover.png" class="aui-img-round">
          <img v-else :src="userLoginInfo.data.cover | imgUrl" class="aui-img-round">
        </router-link>
      </header>
      <div class="index-nav news-nav">
        <ul class="clearfix">
          <router-link tag="li" active-class="active" to="/news/list/index"><a>要闻</a><span></span></router-link>
          <router-link tag="li" active-class="active" to="/news/news24"><a>7*24小时</a><span></span></router-link>
          <router-link tag="li" active-class="active" to="/news/list/bank"><a>银行</a><span></span></router-link>
          <router-link tag="li" active-class="active" to="/news/list/futures"><a>期货</a><span></span></router-link>
          <router-link tag="li" active-class="active" to="/news/list/fund"><a>基金</a><span></span></router-link>
        </ul>
      </div>
      <transition name="slide">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'newsIndex',
    computed: mapGetters({
      userLoginInfo : 'userLoginInfo'
    }),
    data () {
        return {}
    }
  }
</script>

<style scoped>
  .aui-btn .aui-img-round{width:1.5rem}
</style>
