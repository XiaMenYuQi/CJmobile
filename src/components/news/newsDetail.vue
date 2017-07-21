<template>
    <div>
      <mt-header fixed title="要闻">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>

      <div class="aui-content" v-if="newsDetail.news!=null">
        <!--正文-->
        <div class="content news-detail bg-white">
          <h3 class="news-detail-title ">{{newsDetail.news.title}}</h3>
          <p class="news-detail-other">
            <span class="time">{{newsDetail.news.createTime}}</span>
            <span class="time"><a :href="newsDetail.sourceUrl" target="_blank">{{newsDetail.news.source}}</a></span><span class="time">记者：{{newsDetail.news.author}}</span></p>
          <div class="news-detail-article aui-font-size-14" v-html="newsDetail.news.content">

          </div>
        </div>
        <div class="cell"></div>
        <!--相关阅读-->
        <div class="new-detail-related content bg-white">
          <h3 class="new-detail-related-header">相关阅读</h3>
          <ul class="new-detail-related-list">
            <li class="aui-padded-b-10" v-for="item in newsDetail.relateNewsList">
              <h3 class="new-detail-related-title aui-ellipsis-1"><router-link :to="item.accessUrl">{{item.title}}</router-link></h3>
              <div class="news-detail-other aui-ellipsis-2">{{item.digest}}</div>
            </li>
          </ul>
        </div>
        <div class="cell"></div>
        <!--评论列表-->
        <div class="new-detail-related content bg-white" id="commentList">
          <h3 class="new-detail-related-header">评论</h3>
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
            <!--<p v-show="loading" class="page-infinite-loading">-->
            <!--<mt-spinner type="fading-circle" color="#E85546"></mt-spinner>-->
            <!--加载中...-->
            <!--</p>-->
          </div>
          <div class="null-data" v-else>
            <img src="/static/image/null-data.png" alt="暂无数据">
            <p>还没有评论<br />快去抢个沙发吧</p>
          </div>
        </div>
        <!--评论框-->
        <div class="clearfix new-detail-comment">
          <div class="aui-col-xs-8 new-detail-comment-input" @click="checkLogin">
            <input type="text" placeholder="写评论..." :disabled="inputFlag" v-model="comment" @focus="onFocus" @blur="onBlur" >
          </div>

          <div v-show="showBtn">
            <div class="aui-col-xs-2 aui-text-center" @click="toComment">
              <div class="aui-badge">{{newsDetail.news.commentCount == null? '0': newsDetail.news.commentCount }}</div>
              <span class="icon-img icon-comment aui-margin-t-5"></span>
            </div>
            <div class="aui-col-xs-2 aui-text-center" @click="addCollect">
              <span class="icon-img icon-like aui-margin-t-5" :class=" collectFlag?'-act':'' "></span>
            </div>
          </div>
          <div v-show="!showBtn">
            <mt-button type="danger" size="small" :disabled="btnFlag" @click="submit">发表</mt-button>
            <mt-button type="danger" size="small" @click="onClose">取消</mt-button>
          </div>
        </div>
      </div>
      <div class="h30"></div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { Toast } from 'mint-ui';
    import $ from 'jquery'

    export default {
      name: 'newsDetail',
      computed: {
        ...mapGetters({
          newsDetail: 'newsDetail',
          newsComment : 'newsComment',
          collectFlag : 'collectFlag',
          collectAddMsg : 'collectAddMsg',
          userLoginInfo : 'userLoginInfo',
          addCommentMsg : 'addCommentMsg'
        }),
        btnFlag(){
        	if(this.comment == ''){
        		return true
          }else{
        		return false
          }
        },
        inputFlag(){
          if(this.userLoginInfo.data.id==null){
            return true
          }else{
          	return false
          }
        }
      },
      data () {
          return {
          	id : this.$route.params.id,
            likeFlag : false,
            showBtn : true,
            pageNo : 0,
            comment : ''
          }
      },
      watch : {
        collectAddMsg (){
          Toast(this.collectAddMsg.msg);
        },
        addCommentMsg(){
          Toast(this.addCommentMsg.msg);
          this.comment = '';
          this.toComment();
          this.$store.dispatch('getCommentList', { id : this.id , pageNo : 0} );
          //this.$router.push({ name: 'newsComment', params: { id: this.id }})
        }
      },
      created (){
        this.$store.dispatch('getNewsDetail', this.id);
        this.$store.dispatch('getCommentList', { id : this.id , pageNo : this.pageNo} );
        this.$store.dispatch('checkUserCollect', { targetId : this.id , type : 0} );
      },
      mounted (){
      	window.scrollTo(0,0)
      },
      methods :{
        checkLogin(){
          if(this.userLoginInfo.data.id==null){
            Toast('请先登陆!');
            return false;
          }else{
          	return true;
          }
        },
        onFocus(){
        	this.showBtn = false;
        },
        onBlur(){
        	if(this.comment==""){
            this.showBtn = true;
          }
        },
        onClose(){
          this.comment = "";
          this.showBtn = true;
        },
        toComment(){
          $("html, body").animate({
            scrollTop: $("#commentList").offset().top - 40 }, {duration: 500,easing: "swing"});
        },
      	addCollect (){
          if(this.checkLogin()){
            this.$store.dispatch('addUserCollect', { targetId : this.id , type : 0} );
          }
        },
        addMore (){
          var _this = this;
          var totalPage = _this.newsComment.totalPage;
          if(_this.pageNo  + 1  >= totalPage) return;
          _this.pageNo = _this.pageNo + 1;
          _this.$store.dispatch('getCommentList', { id : this.id , pageNo : this.pageNo} );
        },
        submit (){
          this.$store.dispatch('addUserComment', { targetId : this.id , content : this.comment});
        },
        back (){
          window.history.go(-1)
        }
      }
    }
</script>

<style scoped>
  /*--------------------新闻详情页-----------------------*/
  .news-detail{color:#585858;overflow: hidden;}
  .news-detail-title{font-size: 1rem;margin: 0.75rem 0;}
  .news-detail-other{font-size: 0.65rem;color:#7b7b7b; }
  .news-detail-other span{margin-right: 1rem;}
  .news-detail-article p{font-size: 0.75rem;margin: 0.75rem 0;line-height: 1.4rem;color:#585858;}
  .new-detail-related{color:#585858;font-size:0.75rem;}
  .new-detail-related-header{font-weight: bold; padding-bottom: 0.5rem;border-bottom:1px solid #dfdfdf;}
  .new-detail-related-title{margin: 0.5rem 0;}
  .new-detail-comment{  background: #fafafa;  padding: 0.5rem 0;border-top: 1px solid #ccc;position: fixed;bottom: 0;width: 100%;}
  .new-detail-comment-input input[type=text]{    min-height: 1.8rem;width: 90%;  border: 1px solid #d8d8d8;  border-radius: 20px;  padding-left: 0.75rem;  margin: 0 auto;  background: #fff;}
  .new-detail-comment i{font-size: 1.3rem;color:#989898;}
  .new-detail-related-list>li{border-bottom:1px solid #dfdfdf;}
  .h30{height: 3rem;}
  .null-data{margin-top: 10%;}
  .mint-button--small{padding: 0 8px;}
</style>
