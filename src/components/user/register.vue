<template>
  <div class="h-100">
    <mt-header title="注册">
      <mt-button slot="left" icon="back" @click="back"></mt-button>
    </mt-header>
    <div class="aui-content bg-white">
      <div class="login-title">华闵财经</div>
      <vue-form :state="formstate" v-model="formstate" class="login-form" @submit.prevent="onSubmit">
        <ul class="aui-list aui-form-list">
          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>用户名</label></div>
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
                <div class="aui-list-item-label"><label><span class="red">*</span>密码</label></div>
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
          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>重复密码</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="password" name="confirmPassword" placeholder="请重复密码" :matches="model.password" required v-model.lazy="model.confirmPassword">
                  <span class="icon-img icon-input-close form-input-close" ></span>
                </div>
              </div>
            </li>
            <field-messages name="confirmPassword" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
              <div slot="required">重复密码必填</div>
              <div slot="matches">重复密码错误</div>
            </field-messages>
          </validate>
          <validate auto-label>
            <li class="aui-list-item aui-padded-r-15">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label"><label><span class="red">*</span>手机</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="tel" name="phone" placeholder="请输入手机号码" required pattern="^\d{4}\d{3}\d{4}$" v-model.lazy="model.phone">
                  <span class="icon-img icon-input-close form-input-close" ></span>
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
                <div class="aui-list-item-label"><label>&nbsp;邮箱</label></div>
                <div class="aui-list-item-input form-input">
                  <input type="email" name="email" placeholder="请输入电子邮箱" v-model.lazy="model.email">
                  <span class="icon-img icon-input-close form-input-close" ></span>
                </div>
              </div>
            </li>
            <field-messages name="email" show="$touched || $submitted" class="aui-padded-l-r-15 error-msg">
              <div slot="email">邮箱格式不正确</div>
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
          <button class="aui-btn aui-btn-block aui-btn-sm bg-red " type="submit">注册</button>
        </div>
      </vue-form>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import md5 from 'js-md5'
  import { Toast } from 'mint-ui';

  export default {
    name: 'register',
    computed: mapGetters({
      userRegisterMsg : 'userRegisterMsg'
    }),
    data () {
      return {
        formstate : {},
        model : {
          username : '',
          password : '',
          confirmPassword : '',
          email : '',
          phone : '',
          check : true
        },
      }
    },
    watch : {
      userRegisterInfo(){
        Toast({
          message: this.userRegisterMsg.msg,
          position: 'bottom',
          duration: 3000
        });
        if(this.userRegisterMsg.suc){
          this.back();
        }
      }
    },
    methods :{
      onSubmit: function() {
        //console.log(this.formstate.$valid);
        if(this.formstate.$valid){
          this.$store.dispatch('userRegister', { userName : this.model.username , password : md5(md5(this.model.password)) , mobile: this.model.phone,email : this.model.email} );
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
