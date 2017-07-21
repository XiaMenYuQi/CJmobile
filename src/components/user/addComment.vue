<template>
    <div class="comment">
      <mt-header title="">
        <mt-button slot="left" @click="cancel">取消</mt-button>
        <mt-button slot="right" @click="submit">发布</mt-button>
      </mt-header>
      <mt-field placeholder="说点什么吧" type="textarea" rows="4" v-model="content" :attr="{ autofocus: true }"></mt-field>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { Toast } from 'mint-ui';
  import $ from 'jquery'

	export default {
		name: 'addComment',
    computed: mapGetters({
      addCommentMsg : 'addCommentMsg'
    }),
		data () {
			return {
        id : this.$route.params.id,
        content : ''
      }
		},
    methods :{
			submit (){
				if(this.content == ""){
          Toast('您还没有输入内容');
          return
        }
        this.$store.dispatch('addUserComment', { targetId : this.id , content : this.content});
      },
      cancel (){
        this.$parent.showCom = false
      }
    },
    watch :{
      addCommentMsg(){
        Toast(this.addCommentMsg.msg);
        this.$parent.showCom = false;
        this.content = '';
        this.$parent.toComment();
        this.$store.dispatch('getCommentList', { id : this.id , pageNo : 0} );
        //this.$router.push({ name: 'newsComment', params: { id: this.id }})
      }
    }
	}
</script>

<style scoped>
  .comment{
    position: fixed;
    width: 100%;
    bottom : 0;
    left: 0;
    background-color: #f5f5f5;
    z-index: 100;
    -webkit-box-shadow:0 0 10px #CCC;
    -moz-box-shadow:0 0 10px #CCC;
    box-shadow:0 0 10px #CCC;
  }
  .comment .mint-header{
    background-color: #f5f5f5
  }
  .comment .mint-button{
    background: #eee;
    color: #888;
    border: 1px solid #dcdcdc;
    border-radius: .08rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 2rem;
    height: 1.2rem;
  }
</style>
