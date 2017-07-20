<template>
    <div class="search-wrap bg-white aui-padded-t-15" id="search">
      <div class="search-input aui-border-radius">
        <i class="aui-iconfont aui-icon-search"></i>
        <input type="search" placeholder="请输入股票代码或名称" v-model="value" />
        <i class="aui-iconfont aui-icon-close" @click="clearValue"></i>
      </div>
      <div class="search-result" v-show="value != ''">
        <mt-cell
          v-for="item in stockSearch"
          :key="item.code"
          :title="item.name"
          :value="item.code"
          :to="'/market/index/'+item.code"
          @click="clearValue">
        </mt-cell>
      </div>
    </div>
</template>

<script>
  import { Cell  } from 'mint-ui';
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'search',
    components: {
      Cell
    },
    computed: mapGetters({
      stockSearch: 'stockSearch'
    }),
		data () {
			return {
        value : ''
      }
		},
    watch: {
      value (){
        if(this.value == ''||this.value == null){
          this.$store.dispatch('searchInit');
        }else{
          this.$store.dispatch('searchStock' , this.value);
        }
      }
    },
    methods :{
      clearValue (){
      	this.value = ''
      },
      back (){
        window.history.go(-1)
      }
    }
	}
</script>

<style scoped>
  .search-input{ border: 1px solid #888;  width:70%;  margin: 0 auto;  padding: 0 0.5rem;  border-radius: 2rem;}
  .search-input input{min-height:1.4rem;width: 80%;display: inline-block}
  .search-result{width:70%; position: absolute; z-index: 1; left: 15%;}
  .search-result .mint-cell{min-height: 35px;}
  .search-result .mint-cell{border-left: 1px solid #ccc;border-right: 1px solid #ccc; border-bottom: 1px solid #ccc;}
</style>
