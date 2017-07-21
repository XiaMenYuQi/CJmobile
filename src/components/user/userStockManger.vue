<template>
  <div class="bg-white h100">
    <mt-header fixed title="管理自选股">
      <router-link to="/user/stock" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="aui-content" infinite-scroll-distance="50" v-infinite-scroll="addMore">
      <!--<mt-cell-swipe-->
        <!--v-for="item in userStock.myStock.data"-->
        <!--:key="item.code"-->
        <!--:right="[{-->
          <!--content: '删除',style: { background: 'red', color: '#fff' },handler: () => deleteStock(item.code)-->
        <!--}]"-->
        <!--:title="item.name"-->
        <!--:label="item.code"-->
      <!--&gt;-->
      <!--</mt-cell-swipe>-->
      <mt-cell v-for="item in userStock.myStock.data" key="index" :title="item.name" :label="item.code">
        <mt-button size="small" type="danger" @click="deleteStock(item.code)">删除</mt-button>
      </mt-cell>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { CellSwipe , Toast } from 'mint-ui';

	export default {
		name: 'userStockManger',
    components: {
      CellSwipe
    },
    computed: mapGetters({
      userStock: 'userStock',
      deleteStockMsg : 'deleteStockMsg'
    }),
    data() {
      return {
        pageNo : 0,
        pageSize : 20
      };
    },
    created () {
      this.getData();
    },
    methods : {
			init (){
        this.pageNo = 0;
      },
      getData(){
        this.$store.dispatch('getUserStock', {pageNo : this.pageNo ,pageSize: this.pageSize });
      },
      addMore (){
        var totalPage = this.userStock.myStock.totalPage;
        if(this.pageNo + 1 >= totalPage) return;
        this.pageNo = this.pageNo + 1;
        this.getData();
      },
      deleteStock(code){
        //console.log(code)
        this.$store.dispatch('deleteUserStock' , code);
      }
    },
    watch : {
      deleteStockMsg (){
        Toast(this.deleteStockMsg.msg);
        this.init();
        this.getData();
      }
    }
	}
</script>
