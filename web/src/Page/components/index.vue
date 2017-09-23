<template lang="jade">
  div.components
    table
      tr(v-for="component in components")
        td: router-link(:to="'/components/'+component.name") {{ component.name }}
        td.desc {{ component.desc }}
</template>


<script lang="coffee">
  module.exports =
    data: ->
      components: window.components
</script>


<style lang="less">
  .components{
    table{
      border-collapse: collapse;
      tr{
        height: 36px;
        td{
          padding: 0 20px;
        }
      }
    }
  }
</style>