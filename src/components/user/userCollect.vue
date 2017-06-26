<template>
    <div>
      <mt-header title="我的收藏">
        <router-link to="/user/center" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="editClick">{{btnFlag?'编辑': '取消'}}</mt-button>
      </mt-header>
      <div class="aui-content collection aui-margin-t-10" v-if="userCollect.data.length > 0">
        <div class="aui-list aui-list-border-0 aui-media-list" infinite-scroll-distance="50" v-infinite-scroll="addMore">
          <div class="aui-list-item aui-margin-b-10" v-for="item in userCollect.data">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title aui-font-size-14">
                    <router-link :to="item.access_url">{{item.title}}</router-link>
                  </div>
                </div>
              </div>
              <div class="check-wrap" :class="btnFlag?'aui-hide': ''" >
                <input type="checkbox" class="aui-radio" :value="item.id" v-model="checkedItem">
              </div>
            </div>
          </div>
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle" color="#E85546"></mt-spinner>
            加载中...
          </p>
        </div>
        <div class="collection-edit-wrap aui-text-center clearfix" :class="btnFlag?'aui-hide': ''">
          <div class="aui-col-xs-6 aui-border-r" @click.stop="checkAll">{{checkBtnFlag?'取消全选':'全选'}}</div>
          <div class="aui-col-xs-6" @click.stop="deleteNews">删除(<span>{{num}}</span>)</div>
        </div>
      </div>
      <div class="null-data" v-else>
        <img src="/static/image/null-data.png" alt="暂无数据">
        <p>您还没有收藏新闻</p>
      </div>
    </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters, mapActions } from 'vuex'
  import { MessageBox , Toast} from 'mint-ui'

	export default {
		name: 'userCollect',
    computed: {
      //拓展运算符
      ...mapGetters({
        userCollect: 'userCollect',
        collectDeleteMsg : 'collectDeleteMsg'
      }),
      num : function(){
        return this.checkedItem.length
      }
    },
    watch: {
			num (){
        this.checkBtnFlag = (this.num == this.userCollect.data.length);
      },
      userCollect (){
				this.loading = false;
      },
      collectDeleteMsg(){
        Toast(this.collectDeleteMsg.msg);
        this.init();
        this.$store.dispatch('getUserCollect' , this.pageNo);
      }
    },
    data () {
      return {
        pageNo : 0,
        loading : false,
        btnFlag : true,
        checkBtnFlag : false,
        checkedItem :[]
      }
    },
    created () {
      this.$store.dispatch('getUserCollect' , this.pageNo);
    },
    methods :{
			init(){
        this.pageNo = 0;
        this.checkedItem = [];
        this.btnFlag = true;
        this.checkBtnFlag = false;
      },
			editClick (){
				this.btnFlag = !this.btnFlag;
      },
      checkAll (){
				this.checkBtnFlag = !this.checkBtnFlag;
				var arr = [];
				if(this.checkBtnFlag){
					//全选
          this.userCollect.data.forEach(function(e){
            arr.push(e.id)
          });
          this.checkedItem = arr
        }else{
          this.checkedItem = []
        }

      },
      deleteNews (){
      	var _this = this;
      	if(this.num == 0){ return }
        MessageBox.confirm('确定删除选中列表?').then(({ action }) => {
      		//确定
          var idStr = _this.checkedItem.toString();
          _this.$store.dispatch('deleteUserCollect' , idStr);

        },()=>{
      		//取消
      		console.log('reject')
        });
      },
      addMore (){
        var _this = this;
        var totalPage = _this.userCollect.totalPage;
        if(_this.pageNo + 1  >= totalPage) return;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getUserCollect', _this.pageNo);
      }
    }
	}
</script>

<style>
  /*--------------------我的收藏-----------------------*/
  .collection .aui-list .aui-list-item-inner{padding-right: 0.6rem;}
  .collection .aui-list-item{padding-left: 0.6rem;}
  .collection .aui-list-item-media img{height: 3rem;}
  .collection .check-wrap{position: relative;padding:0.74rem;}
  .collection .check-wrap .aui-radio{position: absolute;width: 0.9rem;height:0.9rem;top:50%;margin-top: -0.45rem;left: 0; }
  .collection .aui-radio:checked,.collection .aui-radio.aui-checked{background-color: #E85546 !important;border: 1px solid #E85546 ;}
  .collection-edit-wrap{padding:0.3rem 0;background-color: #E85546;line-height: 2rem;color: #fff;font-size: 0.8rem !important;position: fixed;bottom: 0;width: 100%;z-index:2;}
  .collection-edit-wrap .aui-border-r:after {background-color: #fff;-webkit-transform: scaleX(0.5) !important;  transform: scaleX(0.5) !important;}

</style>
