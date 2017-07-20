<template>
    <div class="h-100">
      <mt-header title="登陆">
        <mt-button slot="left" icon="back" @click="back"></mt-button>
        <router-link to="/user/register" slot="right">
          <mt-button>注册</mt-button>
        </router-link>
      </mt-header>
      <div class="aui-content bg-white">
        <div class="login-title">华闵财经</div>
        <vue-form :state="formstate" v-model="formstate" class="login-form" @submit.prevent="onSubmit">
          <ul class="aui-list aui-form-list">
            <validate auto-label>
              <li class="aui-list-item aui-padded-r-15">
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-label"><label>用户名</label></div>
                  <div class="aui-list-item-input form-input">
                    <input type="text" name="name" placeholder="请输入用户名" maxlength="20" required v-model.lazy="model.username">
                    <span class="icon-img icon-input-close form-input-close" ></span>
                  </div>
                </div>
              </li>
              <field-messages name="name" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
                <div slot="required">用户名必填</div>
                <div slot="maxlength">用户名长度不能超过20</div>
              </field-messages>
            </validate>
            <validate auto-label>
              <li class="aui-list-item aui-padded-r-15">
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-label"><label>密码</label></div>
                  <div class="aui-list-item-input form-input">
                    <input type="password" name="password" placeholder="请输入密码" minlength="6" required v-model.lazy="model.password">
                    <span class="icon-img icon-input-close form-input-close" ></span>
                  </div>
                </div>
              </li>
              <field-messages name="password" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
                <div slot="required">密码必填</div>
                <div slot="minlength">密码最少需要6个字符</div>
              </field-messages>
            </validate>
          </ul>
          <validate auto-label>
            <p class="aui-padded-l-r-15 small-text1 aui-margin-b-10">
              <input type="checkbox" class="aui-checkbox register-check" name="check" required v-model.lazy="model.check">
              我已阅读并同意<router-link class="red" to="/user/agreement">《宇琦财经用户协议》</router-link>
            </p>
            <field-messages name="check" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg aui-margin-b-10">
              <div slot="required">请勾选用户协议</div>
            </field-messages>
          </validate>
          </ul>
          <div class="aui-padded-l-r-15 clearfix aui-margin-b-10">
            <button class="aui-btn aui-btn-block aui-btn-sm bg-red " type="submit">登录</button>
          </div>
          <p class="aui-text-right aui-padded-l-r-15 aui-font-size-12 red">
            <router-link to="/user/forget">
              忘记密码?
            </router-link>
          </p>
        </vue-form>
        <div class="login-other aui-text-center ">
          <span class="icon-img icon-bottom-round"></span>
          <p class="login-other-tip ">第三方登录</p>
          <div class="clearfix aui-padded-l-r-15">
            <div class="aui-col-xs-6"><span class="icon-img icon-qq"></span></div>
            <div class="aui-col-xs-6"><span class="icon-img icon-wechart"></span></div>
            <!--<div class="aui-col-xs-3"><span class="icon-img icon-sina"></span></div>-->
            <!--<div class="aui-col-xs-3"><span class="icon-img icon-baidu"></span></div>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import md5 from 'js-md5'
  import { mapGetters, mapActions } from 'vuex';
  import { Toast } from 'mint-ui';

	export default {
		name: 'login',
    computed: mapGetters({
      userLoginInfo : 'userLoginInfo'
    }),
		data () {
      return {
        formstate : {},
        model : {
          username : '',
          password : '',
          check : true
        },
      }
		},
    watch : {
      userLoginInfo(){
        Toast({
          message: this.userLoginInfo.msg,
          position: 'bottom',
          duration: 3000
        });
        if(this.userLoginInfo.suc){
          this.$router.push({ name: 'index'})
        }
      }
    },
    methods :{
      onSubmit: function() {
        //console.log(this.formstate.$valid);
        if(this.formstate.$valid){
          this.$store.dispatch('userLogin', { userName : this.model.username , password : md5(md5(this.model.password))} );
        }
      },
      back (){
        window.history.go(-1)
      }
    }
	}
</script>

<style scoped>
  .aui-content{padding-top: 0}
  .h-100{height: 100% ; background-color: #fff}
  .error-msg{font-size: .7rem;color: #ED776B}
  button, .aui-btn{border: none}
</style>
