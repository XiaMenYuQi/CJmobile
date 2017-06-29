<template>
    <div>
      <mt-header title="栏目管理">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>

      <mt-cell v-for="item in category" key="index" :title="item.name">
        <mt-button v-if="item.isShow" size="small" type="danger" @click="del(item)">-</mt-button>
        <mt-button v-else size="small" type="primary" @click="add(item)">+</mt-button>
      </mt-cell>
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
