// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import { Header , InfiniteScroll , Spinner , Field , Button , Cell   } from 'mint-ui';
import VueForm from 'vue-form';
import 'mint-ui/lib/style.css'
import "./filter/filter"


import '../static/plugin/aui/css/aui.2.0.css'
import '../static/css/style.css'

Vue.use(MintUI);
Vue.use(InfiniteScroll);
Vue.component(Header.name, Header);
Vue.component(Spinner.name, Spinner);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

Vue.use(VueForm, {
  validators: {
    matches: function (value, attrValue) {
      if(!attrValue) {
        return true;
      }
      return value === attrValue;
    }
  }
});

// getter，返回已注册的过滤器
let imgUrl = Vue.filter('imgUrl');
let newsUrl = Vue.filter('newsUrl');


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
