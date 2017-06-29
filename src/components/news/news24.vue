<template>
  <div class="news-hours-content aui-margin-l-r-15 aui-margin-t-10" infinite-scroll-distance="50" v-infinite-scroll="addMore">
    <div class="news-hours-item" v-for="item in news24List.data">
      <span class="small-text aui-margin-b-10">{{item.createTime}}</span>
      <div class="news-hours-item-title aui-font-size-16">{{item.content}}</div>
    </div>
    <!--<p v-show="loading" class="page-infinite-loading">-->
      <!--<mt-spinner type="fading-circle" color="#E85546"></mt-spinner>-->
      <!--加载中...-->
    <!--</p>-->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { baseImgUrl } from "../../store/baseUrl.js"

  export default {
    name: 'news24',
    computed: mapGetters({
      news24List: 'news24List'
    }),
    data () {
      return {
      	pageNo : 0,
        loading : false
      }
    },
    created(){
      this.$store.dispatch('getNews24List', this.pageNo);
    },
    methods : {
      addMore (){
        var _this = this;
        var totalPage = _this.news24List.totalPage;
        if(_this.pageNo  + 1  >= totalPage) return;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getNews24List', _this.pageNo);
      }
    }
//    watch : {
//      news24List (){
//        this.loading = false
//      }
//    }
  }
</script>
