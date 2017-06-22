<template>
  <div class="aui-content">
    <slide :slideItemList="slideItemList"></slide>
    <div class="aui-padded-l-r-15">
      <ul class="aui-list news-list" v-infinite-scroll="addMore">
        <li class="aui-list-item aui-img"  v-for="item in newsList[index]">
          <div class="aui-list-item-title">
            <div><router-link :to="item.accessUrl | newsUrl">{{item.title}}</router-link></div>
            <span class="small-text aui-margin-t-10">{{item.publishTime}}</span>
          </div>
          <router-link :to="item.accessUrl | newsUrl"><img class="aui-list-item-media" :src="item.cover | imgUrl"></router-link>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Vue from 'vue'
  import slide from "./slide"

  export default {
    name: 'newsList',
    components: {
      slide
    },
    computed: {
    	//拓展运算符
    	...mapGetters({
        newsList: 'newsList',
        slideItemList : 'slideItemList'
      }),
      index () {
        switch (this.name){
          case 'index':
            return 0;
            break;
          case 'bank':
            return 1;
            break;
          case 'futures':
            return 2;
            break;
          case 'fund':
          	return 3;
          	break;
        }
      }
    },
    watch :{
      '$route' (to, from) {
        this.name = this.$route.params.name;
        this.$store.dispatch('getNewsList', {keyMark : this.name , pageNo : 0});
      },
      newsList (){
        this.loading = false
      }
    },
    data () {
      return {
        pageNo : 0,
        loading : false,
        name : this.$route.params.name
      }
    },
    created () {
      //console.log(this.$route.params.name);
      this.$store.dispatch('getNewsList', {keyMark: this.name, pageNo:0});

    },
    methods : {
    	addMore (){
        this.loading = true;
        this.pageNo = this.pageNo + 1;
        this.$store.dispatch('getNewsList', {keyMark : this.name , pageNo : this.pageNo})
      }
    }
  }
</script>
