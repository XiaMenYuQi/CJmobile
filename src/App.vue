<template>
  <div id="app">
    <router-view></router-view>
    <btnTop></btnTop>
  </div>
</template>



<script>
  import btnTop from './components/common/btnTop'

  export default {
    name: 'app',
    components: {
      btnTop
    },
  }
</script>

<style>
  #app{height: 100%}
</style>
