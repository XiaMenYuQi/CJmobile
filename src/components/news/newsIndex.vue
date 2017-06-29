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
        <ul class="clearfix" :style="{width : LiWidth}">
          <router-link v-for="item in category" key="index" v-if="item.isShow" class="nav-li" tag="li" active-class="active" :to="item.url">
            <a>{{item.name}}</a><span></span>
          </router-link>
          <router-link class="nav-li" tag="li" active-class="active" to="/news/category">
            <a>+</a><span></span>
          </router-link>
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
    computed: {
      ...mapGetters({
        userLoginInfo : 'userLoginInfo',
        category : 'category'
      }),
      LiWidth(){
      	return this.liNum * 80 + 'px';
      }
    },
    data () {
      return {
        liNum : ''
      }
    },
    mounted(){
      this.liNum = document.getElementsByClassName('nav-li').length;
    }
  }
</script>

<style scoped>
  .aui-btn .aui-img-round{width:1.5rem}
  .news-nav ul{display: flex;justify-content: flex-start;}
  .news-nav li{display: inline-block;width: 80px}
  .news-nav li span{width:50%;margin-left: -25%;}
</style>
