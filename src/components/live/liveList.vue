<template>
    <div class="bg-white">
      <mt-header fixed title="直播">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content">
        <div class="aui-padded-l-r-15">
          <ul class="aui-list news-list" infinite-scroll-distance="50" v-infinite-scroll="addMore">
            <li class="aui-list-item aui-img"  v-for="item in liveList.data">
              <div class="aui-list-item-title">
                <div><router-link :to="'/live/index/'+ item.id">{{item.title}}</router-link></div>
                <span class="small-text aui-margin-t-10">{{item.start}}</span>
              </div>
              <router-link :to="'/live/index/'+ item.id"><img class="aui-list-item-media" :src="item.cover"></router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'liveList',
    computed: mapGetters({
      liveList : 'liveList'
    }),
    created () {
      this.$store.dispatch('getLiveList', this.pageNo);
    },
		data () {
      return {
        pageNo : 0
      }
		},
    methods : {
      addMore (){
        var _this = this;
        var totalPage = _this.liveList.totalPage;
        if(_this.pageNo  + 1  >= totalPage) return;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getLiveList', _this.pageNo);
      }
    }
	}
</script>

<style scoped>
  .aui-content{padding-top: 40px;}
</style>
