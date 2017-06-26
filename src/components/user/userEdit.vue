<template>
    <div>
      <mt-header title="个人资料">
        <router-link to="/user/center" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="saveClick">保存</mt-button>
      </mt-header>
      <div class="aui-content aui-margin-t-10">
        <div class="aui-list aui-list-border-0">
          <div class="aui-list-item-wrap">
            <div class="aui-list-item aui-padded-l-0 border-b">
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">头像</div>
                <div class="account-avatar">
                  <form id="upload" action="" method="post" enctype="multipart/form-data">
                    <input type="file" id="file" name="file"  @change="upload">
                  </form>
                  <img v-if="userInfo.cover!=null" :src="userInfo.cover | imgUrl" class="aui-img-round">
                  <img v-else src="/static/image/default-cover.png" class="aui-img-round">
                </div>
              </div>
            </div>
          </div>
          <mt-field label="昵称" placeholder="请输入昵称" v-model="userInfo.nick"></mt-field>
          <mt-field label="生日" disabled placeholder="请选择生日" v-model="birthday" @click.native="open('picker')"></mt-field>
          <mt-field label="性别" disabled placeholder="请选择性别" v-model="sex" @click.native="sheetVisible2 = true"></mt-field>
          <div class="aui-margin-b-10"></div>
          <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="userInfo.email"></mt-field>
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="userInfo.mobile"></mt-field>
        </div>

        <mt-datetime-picker
          ref="picker"
          v-model="pickDate"
          :startDate="startDate"
          type="date"
          @confirm="handleChange">
        </mt-datetime-picker>

        <mt-actionsheet :actions="actions2" v-model="sheetVisible2" cancel-text=""></mt-actionsheet>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import { DatetimePicker , Actionsheet  , Toast } from 'mint-ui';
  import { mapGetters, mapActions } from 'vuex'
  import {ctx} from '../../store/baseUrl'

  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(Actionsheet.name, Actionsheet);

  export default {
		name: 'userEdit',
    computed: {
			...mapGetters({
        userInfo : 'userInfo',
        userEditMsg : 'userEditMsg'
      }),
      pickDate (){
        return this.userInfo.birthday ==null? new Date() : new Date(this.userInfo.birthday)
      }
    },
		data () {
			return {
        startDate : new Date('1950-1-1'),
        sex : '',
        birthday : '',
        sheetVisible2: false,
        actions2: []
      }
		},
    created () {
      this.$store.dispatch('getUserInfo');
    },
    watch : {
      userEditMsg(){
        Toast(this.userEditMsg.msg);
        if(this.userEditMsg.suc){
          this.$router.push({ name: 'userCenter'})
        }
      }
    },
    methods: {
      upload(){
      	var _this = this;
        var formData = new FormData($("#upload")[0]);
        //console.log(formData)
        $.ajax({
          url: ctx+ '/transfer',
          type: 'POST',
          data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (result) {
            if(result.suc){
              console.log(result);
              _this.userInfo.cover = result.data;
            }
          },
          error: function (err) {
            console.log(err);
          }
        });
      },
      saveClick(){
        var emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if ( this.userInfo.mobile != '' && this.userInfo.mobile != null) {
        	if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.userInfo.mobile))){
            Toast({
              message: '手机号格式不正确',
              position: 'bottom',
              duration: 3000
            });
            return false;
          }
        }
        if (this.userInfo.email != '' && this.userInfo.email != null ) {
        	if( !emailReg.test(this.userInfo.email) ){
            Toast({
              message: '邮箱格式不正确',
              position: 'bottom',
              duration: 3000
            });
            return false;
          }
        }
      	var data = {
      		nick : this.userInfo.nick,
          birthday : this.birthday,
          sex : this.sex == '男'? 1 : 0,
          email : this.userInfo.email,
          mobile : this.userInfo.mobile,
          cover : this.userInfo.cover,
        };
        this.$store.dispatch('saveUserInfo',data);

      },
      open(picker) {
        this.$refs[picker].open();
      },
      handleChange(value) {
        var year = value.getFullYear();
        var month = value.getMonth() + 1;
        month = month<10?'0'+month:month;
        var day = value.getDate()<10?'0'+value.getDate() : value.getDate();
        this.birthday = year + '-' + month + '-' + day;
      },
      setMan(){
        this.sex = '男';
      },
      setWoman(){
        this.sex = '女'
      }
    },
    mounted() {
      if(this.userInfo.sex == 1){
        this.sex = '男';
      }else if(this.userInfo.sex == 0){
      	this.sex = '女'
      }
      if(this.userInfo.birthday!=null&&this.userInfo.birthday!=''){
      	this.birthday = this.userInfo.birthday.substr(0,10)
      }
      this.actions2 = [{
        name: '男',
        method : this.setMan
      }, {
        name: '女',
        method: this.setWoman
      }]
    }
	}
</script>

<style scoped>
  #upload input[type='file']{
    position: absolute;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
  }
  .aui-list-item-wrap{padding: 0 10px}
</style>
