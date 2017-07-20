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
        <!--评论-->
        <div class="clearfix new-detail-comment">
          <div class="aui-col-xs-8 new-detail-comment-input" @click="showComment">
            <input type="text" placeholder="写评论..." disabled>
          </div>
          <div class="aui-col-xs-2 aui-text-center">
            <div class="aui-badge">{{newsDetail.news.commentCount == null? '0': newsDetail.news.commentCount }}</div>
            <router-link :to="'/news/comment/' + newsDetail.news.id">
            <span class="icon-img icon-comment aui-margin-t-5"></span>
            </router-link>
          </div>
          <div class="aui-col-xs-2 aui-text-center" @click="addCollect">
            <span class="icon-img icon-like aui-margin-t-5" :class=" collectFlag?'-act':'' "></span>
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
      name: 'newsDetail',
      components: {
        addComment
      },
      computed: mapGetters({
        newsDetail: 'newsDetail',
        collectFlag : 'collectFlag',
        collectAddMsg : 'collectAddMsg',
        userLoginInfo : 'userLoginInfo'
      }),
      data () {
          return {
          	id : this.$route.params.id,
            likeFlag : false,
            showCom : false
          }
      },
      watch : {
        collectAddMsg (){
          Toast(this.collectAddMsg.msg);
        }
      },
      created (){
        this.$store.dispatch('getNewsDetail', this.id);
        this.$store.dispatch('checkUserCollect', { targetId : this.id , type : 0} );
      },
      mounted (){
      	window.scrollTo(0,0)
      },
      methods :{
      	addCollect (){
          if(this.userLoginInfo.data.id==null){
            Toast('请先登陆!');
            return;
          }
          this.$store.dispatch('addUserCollect', { targetId : this.id , type : 0} );
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
</style>
