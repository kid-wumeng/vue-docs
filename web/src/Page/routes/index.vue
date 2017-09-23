<template lang="jade">
  div.routes
    table
      tr(v-for="route in routes")
        td: router-link(:to="'/routes/'+route.paths.join('.')") {{ route.paths.join('/') }}
        td.desc 角色主页
</template>


<script lang="coffee">
  module.exports =
    data: ->
      routes: window.routes
</script>


<style lang="less">
  .routes{
    table{
      border-collapse: collapse;
      tr{
        height: 36px;
        td{
          padding: 0 20px;
        }
        td.desc{
          font-size: 14px;
          font-weight: 500;
          color: #364149;
        }
      }
    }
  }
</style>