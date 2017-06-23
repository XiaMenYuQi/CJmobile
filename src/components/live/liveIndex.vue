<template>
    <div>
      <mt-header fixed :title="liveIndex.title">
        <router-link to="/live/list" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content">
        <div id="J_prismPlayer" class="prism-player"></div>

        <div class="aui-list aui-media-list aui-list-border-0 live-userBox">
          <div class="aui-list-item aui-list-item-middle">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media" style="width: 3.75rem;">
                <img v-if="liveIndex.expertCover!=null" :src="liveIndex.expertCover | imgUrl" class="aui-img-round aui-list-img-sm" style="height:3rem;">
                <img v-else src="/static/image/default-cover.png" class="aui-img-round aui-list-img-sm" style="height:3rem;">
              </div>
              <div class="aui-list-item-inner aui-padded-r-15 aui-margin-r-15">
                <div class="aui-list-item-text aui-margin-b-15">
                  <div class="aui-list-item-title aui-font-size-16 aui-ellipsis-1">{{liveIndex.expertNick}}</div>
                </div>
                <div class="aui-list-item-text small-text aui-ellipsis-1">
                {{liveIndex.start}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-box">
          <mt-cell :title="item.name" :value="item.time" :label="item.msg" v-for="item in responeArr" key="index"></mt-cell>
        </div>

        <div class="clearfix live-chart">
          <div class="aui-col-xs-10 live-chart-input">
            <input type="text" placeholder="说两句吧..." v-model="chartText">
          </div>
          <div class="aui-col-xs-2 aui-text-center">
            <mt-button type="danger" size="small" @click="send">发送</mt-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Toast } from 'mint-ui';
  import { liveUrl } from '../../store/baseUrl'
  import '../../../static/plugin/ckplayer/ckplayer.js'

  let socket;
	export default {
		name: 'liveIndex',
    computed: mapGetters({
      liveIndex : 'liveIndex',
      userLoginInfo : 'userLoginInfo'
    }),
		data () {
			return {
				id : 20,
        chartText: '',
        responeArr : []
      }
		},
    created () {
      this.$store.dispatch('getLiveIndex', this.id);
    },
    watch:{
      liveIndex (){
      	let _this = this;
        let live = this.liveIndex;
        //正常只有1、5状态会进入这个页面
        let flashlets = {};
        let video= [];
        if (live.state==5) {
          flashlets={
            p:1,
            e:1,
            i: live.cover
          };
          video = [live.recordUrl];
          let support=['all'];
          CKobject.embedHTML5('J_prismPlayer','CKPlayer','100%','100%',video,flashlets,support);
        }else if(live.state==1) {
          //正在直播pass
          flashlets={
            f: live.liveUrl,
            s:0,//调用方式，0=普通调用
            deft:'UD,HD,SD,LD',//配置文件里有，则不需要再设置
            deff: live.liveUrl+'_lud|' + live.liveUrl + '_lhd|'  + live.liveUrl + '_lsd|' + live.liveUrl + '_lld'
          };
        }else{
          Toast({
            message: '直播状态异常！',
            position: 'bottom',
            duration: 3000
          });
        }


        //CKobject.embed('../../../static/plugin/ckplayer/ckplayer.swf','J_prismPlayer','CKPlayer','100%','300',false,flashlets,video,params);

        /*****************聊天室相关*****************/
        let loginUserId = "";
        if(null!=this.userLoginInfo.data.id){
          loginUserId=this.userLoginInfo.data.id
        }
        let wsUrl = liveUrl.replace("http:", "ws:")+"/ws?3_"+live.id+'_'+ loginUserId;
        console.log(wsUrl);
        socket = new WebSocket(wsUrl);
        //连接监听事件
        socket.onopen = function() {
          console.log('Connection open!');
        };

        //关闭监听事件
        socket.onclose = function() {
          console.log('Connection disconnected');
        };

        //收到消息监听事件
        socket.onmessage = function(evt) {
          let received_msg = evt.data;
          console.log('message from server:', received_msg);

          let respone = JSON.parse(received_msg);
          if(!respone){
            return;
          }
//          let userName = respone.isLoginUser==1?("'"+respone.name+"'"):("游客'"+respone.name+"'");
//          let time = respone.time;
//          let msg = respone.msg;
//          let msgType = respone.msgType;
//          console.log(msgType)
//          if(msgType==-1){
//            userName = '系统消息'
//            msg = "消息异常！请尝试刷新页面或重新登录"
//          }
          _this.responeArr.unshift(respone);
        };
      }
    },
    methods: {
      send(){
        //发送消息
        let _this = this;
        let msg = this.chartText;
        if(null!=this.userLoginInfo.data.id){
          Toast("请先登陆！");
          return false;
        }
        if (null==msg || msg.length<=0) {
          Toast("消息内容不能为空！");
          return false;
        }
        //json msg by str
        socket.send(JSON.stringify({
          'clientType' : 3,
          'message' : msg,
          'id': _this.userLoginInfo.data.id
        }));

        this.chartText = '';
      }
    }
	}
</script>


<style scoped>
  .aui-content{ height: 100vh ;padding: 40px 0 60px}
  .prism-player{height: 45%;}
  .live-chart{  background: #fafafa;  padding: 0.5rem 0;border-top: 1px solid #ccc;position: fixed;bottom: 0;width: 100%;}
  .live-chart-input input[type=text]{    min-height: 1.8rem;width: 90%;  border: 1px solid #d8d8d8;  border-radius: 20px;  padding-left: 0.75rem;  margin: 0 auto;  background: #fff;}
  .live-chart i{font-size: 1.3rem;color:#989898;}
  .chart-box{ overflow-y: auto; height: 40%}
  .live-userBox{height: 15%; border-bottom: 1px solid #ccc;}
</style>
