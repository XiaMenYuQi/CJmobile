<template>
    <div>
      <mt-header title="个人中心">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content user-index">
        <div class="aui-list aui-media-list aui-margin-b-15 aui-list-border-0 ">
          <div class="aui-list-item aui-list-item-middle">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media" style="width: 4.75rem;">
                <img v-if="userLoginInfo.data.cover!=null" :src="userLoginInfo.data.cover | imgUrl" class="aui-img-round aui-list-img-sm" style="height:4rem;">
                <img v-else src="/static/image/default-cover.png" class="aui-img-round aui-list-img-sm" style="height:4rem;">
              </div>
              <div class="aui-list-item-inner aui-padded-r-15 aui-margin-r-15">
                <div class="aui-list-item-text aui-margin-b-15">
                  <div class="aui-list-item-title aui-font-size-16 aui-ellipsis-1">{{userLoginInfo.data.nick}}</div>
                </div>
                <!--<div class="aui-list-item-text small-text aui-ellipsis-1">-->
                  <!--{{userInfo.mobile}}-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="aui-list aui-list-border-0">
          <div class="aui-list-item-wrap">
            <router-link to="/user/edit">
            <div class="aui-list-item aui-padded-l-0 border-b">
              <div class="aui-list-item-label-icon">
                <span class="icon-img icon-user aui-padded-r-10 "></span>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">个人资料</div>
              </div>
            </div>
            </router-link>
          </div>

          <div class="aui-list-item-wrap">
            <router-link to="/user/message">
            <div class="aui-list-item aui-padded-l-0 border-b">
              <div class="aui-list-item-label-icon">
                <span class="icon-img icon-remind aui-padded-r-10 "></span>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">站内消息</div>
              </div>
            </div>
            </router-link>
          </div>

          <div class="aui-list-item-wrap aui-margin-b-15">
            <router-link to="/user/collect">
            <div class="aui-list-item aui-padded-l-0 ">
              <div class="aui-list-item-label-icon">
                <span class="icon-img icon-star aui-padded-r-10 "></span>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">新闻页面收藏</div>
              </div>
            </div>
            </router-link>
          </div>

          <div class="account-btn" @click="logout">退出登录</div>

        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'userCenter',
    computed: mapGetters({
      userLoginInfo: 'userLoginInfo'
    }),
//    created () {
//      this.$store.dispatch('getUserInfo');
//    },
    methods :{
    	logout (){
        this.$store.dispatch('userLogout');
        this.$router.push({ name: 'index'})
      },
      back (){
        window.history.go(-1)
      }
    }
  }
</script>
