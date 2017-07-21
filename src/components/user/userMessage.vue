<template>
    <div>
      <mt-header fixed title="站内消息">
        <router-link to="/user/center" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="editClick">{{btnFlag?'编辑': '取消'}}</mt-button>
      </mt-header>
      <div class="aui-content collection" v-if="userMessage.data.length > 0">
        <div class="aui-list aui-list-border-0 aui-media-list" infinite-scroll-distance="50" v-infinite-scroll="addMore">
          <div class="aui-list-item" v-for="item in userMessage.data" :class="item.state==0?'': 'bg-gary'">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="mess-li" @click="detail(item)">
                    <div class="mess-head clearfix">
                      <p class="title aui-ellipsis-1">
                        <i class="aui-iconfont aui-icon-mail aui-font-size-18 aui-margin-t-5"><div v-if="item.state==0" class="aui-dot"></div></i>
                        {{item.title}}
                      </p>
                      <p class="time">{{item.send_time}}</p>
                    </div>
                    <div class="mess-con aui-ellipsis-2">{{item.content}}</div>
                  </div>
                </div>
              </div>
              <div class="check-wrap" :class="btnFlag?'aui-hide': ''" >
                <input type="checkbox" class="aui-radio" :value="item.id" v-model="checkedItem">
              </div>
            </div>
          </div>
        </div>

        <div class="collection-edit-wrap aui-text-center clearfix" :class="btnFlag?'aui-hide': ''">
          <div class="aui-col-xs-6 aui-border-r" @click.stop="checkAll">{{checkBtnFlag?'取消全选':'全选'}}</div>
          <div class="aui-col-xs-6" @click.stop="deleteNews">删除(<span>{{num}}</span>)</div>
        </div>

      </div>
      <div class="null-data" v-else>
        <img src="/static/image/null-data.png" alt="暂无数据">
        <p>您还没有消息</p>
      </div>

      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mint-popup">
        <h1>{{popupTitle}}</h1>
        <p>{{popupCon}}</p>
      </mt-popup>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { MessageBox , Toast} from 'mint-ui'

	export default {
		name: 'userMessage',
    computed: {
      ...mapGetters({
        userMessage: 'userMessage'
      }),
      num : function(){
        return this.checkedItem.length
      }
    },
		data () {
			return {
				pageNo : 0,
        popupVisible : false,
        popupTitle : '',
        popupCon : '',
        btnFlag : true,
        checkBtnFlag : false,
        checkedItem :[]
      }
		},
    watch: {
      num (){
        this.checkBtnFlag = (this.num == this.userMessage.data.length);
      },
    },
    created () {
      this.$store.dispatch('getUserMessage' , this.pageNo);
    },
    methods : {
      detail(item){
      	this.popupTitle = item.title;
      	this.popupCon = item.content;
      	this.popupVisible = true;
      	if(item.state == 0){
          this.$store.dispatch('updateUserMessage' , {idStr : item.id , state : 1});
          item.state = 1;
        }
      },
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
          this.userMessage.data.forEach(function(e){
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
          _this.$store.dispatch('updateUserMessage' , {idStr : idStr , state : 2});
          _this.init();
          _this.$store.dispatch('getUserMessage' , this.pageNo);
          Toast('删除成功！');
        },()=>{
          //取消
          console.log('reject')
        });
      },
      addMore (){
        var _this = this;
        var totalPage = _this.userMessage.totalPage;
        if(_this.pageNo + 1  >= totalPage) return;
        _this.pageNo = _this.pageNo + 1;
        _this.$store.dispatch('getUserMessage', _this.pageNo);
      }
    }
	}
</script>

<style scoped>
  .aui-list-item{border-bottom: 1px solid #ccc;}
  .aui-dot{top: 0;right: -16%;}
  .bg-gary{background-color: #f5f5f5}
  .mess-li{width: 100%}
  .mess-li .title{width: 60%;float: left;font-size: .8rem;color: #000;}
  .mess-li .time{width: 40%;float: left;font-size: .5rem;margin-top: 5px; text-align: right;}
  .mess-li .mess-con{font-size: .6rem;color: #757575;margin-bottom: 5px;}
  .mint-popup{width: 80%;border-radius: 8px; padding: 10px;max-height: 80%; overflow-y: auto;}
  .mint-popup h1{font-size: 20px;color: #26a2ff;}
</style>
