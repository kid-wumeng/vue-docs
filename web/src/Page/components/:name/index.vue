<template lang="jade">
  div.component
    h1 {{ component.name }}
</template>


<script lang="coffee">
  module.exports =
    computed:
      component: -> window.components.filter((component) => component.name is @$route.params.name)[0]
</script>


<style lang="less">

</style>