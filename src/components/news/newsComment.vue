<template>
  <div class="">
    <mt-header title="评论">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="aui-content ">
      <div class="aui-padded-l-r-15 bg-white" v-if="newsComment.data.length > 0">
        <ul class="aui-list aui-media-list" infinite-scroll-distance="50" v-infinite-scroll="addMore">
          <li class="aui-list-item aui-padded-l-0" v-for="item in newsComment.data">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media comment-list-avatar">
                <img :src="item.cover | imgUrl" class="aui-img-round" v-if="item.cover!=null">
                <img src="/static/image/default-cover.png" class="aui-img-round" v-else>
              </div>
              <div class="aui-list-item-inner aui-padded-r-0">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title comment-list-name">{{item.nick}}</div>
                </div>
                <div class="aui-list-item-text comment-list-con">
                  {{item.content}}
                </div>
                <div class="aui-info aui-margin-t-5" style="padding:0">
                  <div class="aui-info-item">
                    <span class="comment-list-time">{{item.create_time}}</span>
                  </div>
                  <!--<div class="aui-info-item aui-font-size-12"><span class="icon-img icon-favour aui-margin-r-5"></span>26</div>-->
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
          加载中...
        </p>
      </div>
      <div class="null-data" v-else>
        <img src="/static/image/null-data.png" alt="暂无数据">
        <p>还没有评论<br />快去抢个沙发吧</p>
      </div>
      <!--评论-->
      <div class="clearfix new-detail-comment">
        <div class="new-detail-comment-input" @click="showComment" >
          <input type="text" placeholder="写评论..." disabled />
        </div>
      </div>
      <addComment v-show="showCom"></addComment>
    </div>
    <div class="h30"></div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { Toast } from 'mint-ui';
  import addComment from '../user/addComment'

	export default {
		name: 'newsComment',
    components: {
      addComment
    },
    computed: mapGetters({
      newsComment : 'newsComment',
      userLoginInfo : 'userLoginInfo'
    }),
		data () {
			return {
        id : this.$route.params.id,
        pageNo : 0,
        loading : false,
        showCom : false
      }
		},
    created (){
      this.$store.dispatch('getCommentList', { id : this.id , pageNo : this.pageNo} );
    },
    methods :{
      addMore (){
        var _this = this;
        var totalPage = _this.newsComment.totalPage;
        if(_this.pageNo  + 1  >= totalPage) return;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getCommentList', { id : this.id , pageNo : this.pageNo} );
      },
      showComment (){
        if(this.userLoginInfo.data.id==null){
          Toast('请先登陆!');
          return;
        }
      	this.showCom = true;
      },
      back (){
        window.history.go(-1)
      }
    },
    watch : {
      newsComment (){
        this.loading = false
      }
    }
	}
</script>

<style scoped>
  .new-detail-comment{  background: #fafafa;  padding: 0.5rem 0;border-top: 1px solid #ccc;position: fixed;bottom: 0;width: 100%;}
  .new-detail-comment-input input[type=text]{    min-height: 1.8rem;width: 90%;  border: 1px solid #d8d8d8;  border-radius: 20px;  padding-left: 0.75rem;  margin: 0 auto;  background: #fff;}
  .new-detail-comment i{font-size: 1.3rem;color:#989898;}
  .h30{height: 3rem;}
</style>
