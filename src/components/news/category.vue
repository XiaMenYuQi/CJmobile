<template>
    <div class="bg-white h100">
      <mt-header fixed title="栏目管理">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>

      <div class="aui-content">
        <div class="category content bg-white">
          <h3 class="category-header">已添加<span>点击删除</span></h3>
          <ul class="category-list aui-row">
            <li class="aui-col-xs-4 aui-margin-t-15" v-for="item in category" v-if="item.isShow">
              <mt-button size="small" type="default" @click="del(item)">{{item.name}} <i class="aui-iconfont aui-icon-close"></i></mt-button>
            </li>
          </ul>
        </div>
        <div class="category content bg-white">
          <h3 class="category-header">快速添加<span>点击添加</span></h3>
          <ul class="category-list aui-row">
            <li class="aui-col-xs-4 aui-margin-t-15" v-for="item in category" v-if="item.isShow == false">
              <mt-button size="small" type="default" @click="add(item)">{{item.name}}</mt-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'category',
    computed: mapGetters({
        category : 'category'
      }),
		data () {
			return {

      }
		},
    methods: {
      del(item){
      	item.isShow = false
      },
      add(item){
        item.isShow = true
      },
      back (){
        window.history.go(-1)
      }
    }
	}
</script>

<style scoped>
  .category{color:#585858;font-size:0.75rem;}
  .category .category-header{font-weight: bold; padding-bottom: 0.5rem;border-bottom:1px solid #dfdfdf;}
  .category .category-header span{font-size: 0.6rem;padding-left: 20px;color: #ccc;}
  .category .category-list{margin: 0.5rem 0;}
  .category .category-list>li{padding: 0 5px}
  .category .category-list>li button{width: 100%}
</style>
