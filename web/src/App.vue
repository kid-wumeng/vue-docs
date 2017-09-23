<template lang="jade">
  div#app
    side-bar
    page
</template>


<script lang="coffee">
  module.exports =
    components:
      'side-bar': require('./SideBar')
      'page':     require('./Page')
</script>


<style lang="less">
  *{
    margin: 0;
    border: 0;
    padding: 0;
    font-family: 'PT Sans', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  li{
    list-style: none;
  }

  #app{
    display: flex;
  }
</style>