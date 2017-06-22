<template>
  <button type="button" class="aui-btn aui-btn-sm check-btn" :disabled="!checkBtn" :class="btnClass">{{ btnText }}</button>
</template>

<script>
	export default {
		name: 'timeBtn',
    props: ['mobile'],
    computed: {
      btnText() {
        return this.time > 0 ?  '重发('+ this.time +')' : '发送';
      },
      btnClass(){
      	return this.time > 0? '' : 'aui-btn-danger'
      }
    },
    data () {
      return {
        checkBtn: true,
        time : 0
      }
    },
    methods :{
      run() {
        this.time = 60;
        this.timer();
      },
      timer() {
        if (this.time > 0) {
          this.checkBtn = false;
          this.time = this.time - 1;
          setTimeout(this.timer, 1000);
        }else{
          this.checkBtn = true;
        }
      }
    }
	}
</script>

<style scoped>
  .check-btn{float: right;height: 1.5rem;line-height: 1rem;}
</style>
