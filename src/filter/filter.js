import Vue from 'vue'
import { baseImgUrl } from "../store/baseUrl.js"

// 处理图片地址
Vue.filter('imgUrl', function (value) {
  // 返回处理后的值
  if (!value) return;
  value = value.toString();
  return baseImgUrl + value;
});

//处理新闻详情地址
Vue.filter('newsUrl', function (value ) {
  if (!value) return;
  value = value.toString();
  return value.split('.')[0];
});

//处理股票时间
Vue.filter('stockTime', function (value ) {
  if (!value) return;
  value = value.toString();
  var arr = value.split('');
  return arr[0]+arr[1]+arr[2]+arr[3]+'-'+arr[4]+arr[5]+'-'+arr[6]+arr[7]
    +' '+arr[8]+arr[9]+':'+arr[10]+arr[11]+':'+arr[12]+arr[13]
});
