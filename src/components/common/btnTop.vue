<template>
   <aside class="aside-btn btn-top" @click="toTop"></aside>
</template>

<script>
  import $ from 'jquery'

	export default {
		name: 'btnTop',
    methods: {
			toTop(){
        $("html, body").animate({
          scrollTop: 0 }, {duration: 500,easing: "swing"});
      }
    }
	}
</script>

<style>
  .aside-btn {
    position: fixed;
    z-index: 99;
    right: 1rem;
    bottom: 3rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 999px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
  }
  .btn-top {
    background: rgba(0,0,0,0.5) url(/static/image/btn-totop.png) no-repeat center;
    background-size: 1rem 1rem;
  }

</style>
