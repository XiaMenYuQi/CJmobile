<template>
  <div class="h-100">
    <mt-header title="找回密码">
      <mt-button slot="left" icon="back" @click="back"></mt-button>
    </mt-header>
    <div class="aui-content bg-white">
      <div class="login-title">华闵财经</div>
      <vue-form :state="formstate" v-model="formstate" class="login-form" @submit.prevent="onSubmit">
        <ul class="aui-list aui-form-list">

          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>手机</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="tel" name="phone" placeholder="请输入手机号码" required pattern="^\d{4}\d{3}\d{4}$" v-model.lazy="model.mobile">
                </div>
              </div>
            </li>
            <field-messages name="phone" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
              <div slot="required">手机必填</div>
              <div slot="pattern">手机格式不正确</div>
            </field-messages>
          </validate>

          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>验证码</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="text" class="check-input" name="name" placeholder="请输入验证码" required v-model.lazy="model.check">
                  <timeBtn @click.native="send" ref="btn"></timeBtn>
                </div>
              </div>
            </li>
            <field-messages name="name" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
              <div slot="required">验证码必填</div>
            </field-messages>
          </validate>

          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>密码</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="password" name="password" placeholder="请输入密码" minlength="6" required v-model.lazy="model.password">
                </div>
              </div>
            </li>
            <field-messages name="password" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
              <div slot="required">密码必填</div>
              <div slot="minlength">密码最少需要6个字符</div>
            </field-messages>
          </validate>
          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>重复密码</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="password" name="confirmPassword" placeholder="请重复密码" :matches="model.password" required v-model.lazy="model.confirmPassword">
                </div>
              </div>
            </li>
            <field-messages name="confirmPassword" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
              <div slot="required">重复密码必填</div>
              <div slot="matches">重复密码错误</div>
            </field-messages>
          </validate>

        </ul>
        <div class="aui-padded-l-r-15 clearfix aui-margin-b-10">
          <button class="aui-btn aui-btn-block aui-btn-sm bg-red " type="submit">保存</button>
        </div>
      </vue-form>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import md5 from 'js-md5'
  import { Toast } from 'mint-ui';
  import timeBtn from './timeBtn'

  export default {
    name: 'forgetPassword',
    components: {
      timeBtn
    },
    computed:mapGetters({
      sendCodeMsg : 'sendCodeMsg',
      userForgetMsg : 'userForgetMsg'
    }),
    data () {
      return {
        formstate : {},
        model : {
          mobile : '',
          check : '',
          password : '',
          confirmPassword : '',
        },
        checkBtn: true,
        time : 0
      }
    },
    watch : {
      sendCodeMsg(){
        Toast({
          message: this.sendCodeMsg.msg,
          position: 'bottom',
          duration: 3000
        });
      },
      userForgetMsg(){
        Toast({
          message: this.userForgetMsg.msg,
          position: 'bottom',
          duration: 3000
        });
      }
    },
    methods :{
      onSubmit() {
        //console.log(this.formstate.$valid);
        if(this.formstate.$valid){
        	var data = {
            mobile: this.model.mobile,
            password : md5(md5(this.model.password)),
            yzmCode : this.model.check
          };
          this.$store.dispatch('getUserForget', data);
        }
      },
      send() {
        if(this.formstate.phone.$valid){
          this.$refs.btn.run();
          this.$store.dispatch('getSendCode', this.model.mobile)
        }
      },
      back (){
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .h-100{height: 100% ; background-color: #fff}
  .check-input{width: 60%;float: left}
  .error-msg{font-size: .7rem;color: #ED776B}
  button, .aui-btn{border: none}
</style>
