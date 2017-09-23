<template lang="jade">
  div.route
    h1 {{ route.path }}
</template>


<script lang="coffee">
  module.exports =
    computed:
      route: -> window.routes.filter((route) => route.paths.join('.') is @$route.params.path)[0]
</script>


<style lang="less">

</style>