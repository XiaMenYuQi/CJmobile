<template>
    <div class="bg-white">
      <mt-header fixed title="直播">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content">
        <ul class="aui-list live-list" infinite-scroll-distance="50" v-infinite-scroll="addMore">
          <li class="aui-list-item aui-img"  v-for="item in liveList.data">
            <router-link :to="'/live/index/'+ item.id">
              <div class="expert">
                <img class="expertCover" :src="item.expertCover | imgUrl" alt="头像">
                <span class="nick">{{item.expertNick}}</span>
              </div>
              <div class="state" v-if="item.state == 1">
                <span class="point point-green"></span>正在直播
              </div>
              <div class="state" v-else>
                <span class="point point-red"></span>查看回放
              </div>
              <div class="aui-list-item-title">
                <p class="aui-ellipsis-1">{{item.title}}</p>
                <span class="small-text">{{item.start}}</span>
              </div>
              <img class="live-img" :src="item.cover">
              <div class="mask"></div>
            </router-link>
          </li>
        </ul>
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
  .live-list .aui-list-item{padding-left: 0;}
  .live-list .aui-list-item>a{width: 100%;height: 9rem;display: inline-block; position: relative;}
  .live-list .expert{position: absolute;top: 15%;left: 5%;z-index: 1}
  .live-list .expert .expertCover{width: 2rem;height: 2rem;border-radius: 50%;position: relative;z-index: 1;float: left}
  .live-list .expert .nick{color: #fff;padding: 5px 25px;border-radius: 20px;background-color: #DB5C4F;opacity: .8;display: inline-block;margin-top: 7px;margin-left: -20px;font-size: .6rem;}
  .live-list .state{position: absolute ;top: 15%;right: 5%;z-index: 1; color: #fff;padding: 5px 25px;border-radius: 20px;background-color: #000;opacity: .6;display: inline-block;margin-top: 7px;font-size: .6rem;}
  .live-list .state .point{width: 7px;height: 7px;position: absolute;left: 12px;top: 11px;border-radius: 50%;display: inline-block;  }
  .live-list .state .point-green{background: #4EFE17;}
  .live-list .state .point-red{background: #FF1718;}
  .live-list .aui-list-item-title{position: absolute;bottom: 5%;left: 5%;z-index: 1;}
  .live-list .aui-list-item-title p{color: #fff;font-size: 1rem;}
  .live-list .aui-list-item-title .small-text{color: #fff!important;}
  .live-list .live-img{width: 100%;height: 100%;}
  .live-list .mask{position: absolute;opacity: .3;background-color: #000;width: 100%;height: 37%;bottom: 0}
</style>
