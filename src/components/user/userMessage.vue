<template>
    <div>
      <mt-header title="站内消息">
        <router-link to="/user/center" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content aui-padded-r-10 aui-padded-l-10" v-if="userMessage.data.length > 0" v-infinite-scroll="addMore">
        <div class="station-item aui-margin-t-15" v-for="item in userMessage.data">
          <p class="station-item-time aui-text-center aui-font-size-12">{{item.send_time}}</p>
          <div class="station-item-wrap">
            <h3 class="station-item-title">{{item.title}}</h3>
            <div class="station-item-con"></div>
          </div>
        </div>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
          加载中...
        </p>
        <!--<div class="station-item aui-margin-t-15">-->
          <!--<p class="station-item-time aui-text-center aui-font-size-12">2017-03-27 13:05</p>-->
          <!--<div class="station-item-wrap">-->
            <!--<h3 class="station-item-title aui-margin-b-10">周小川：货币政策并非万灵药 不能过于依赖</h3>-->
            <!--<div class="station-item-img aui-margin-b-15"><img src="/static/image/img1.jpg"></div>-->
            <!--<div class="station-item-con">在主题为“货币政策”的博鳌亚洲论坛2017年年会论坛上，参与讨论的嘉宾大多数时候谈的却是财政政策和结构性改革。这或许能说明在当前的…...</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="null-data" v-else>
        <img src="/static/image/null-data.png" alt="暂无数据">
        <p>您还没有消息</p>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'userMessage',
    computed: mapGetters({
      userMessage: 'userMessage'
    }),
		data () {
			return {
				pageNo : 0,
        loading : false
      }
		},
    created () {
      this.$store.dispatch('getUserMessage' , this.pageNo);
    },
    methods : {
      addMore (){
        let _this = this;
        let totalPage = _this.userMessage.totalPage;
        if(_this.pageNo + 1  >= totalPage) return;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getUserMessage', _this.pageNo);
      }
    },
    watch : {
      userMessage (){
        this.loading = false
      }
    }
	}
</script>
