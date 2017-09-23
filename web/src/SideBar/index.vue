<template lang="jade">
  div#side-bar
    .title {{ title }}

    ul.first
      li: router-link(to="/routes")     Routes ({{ routes.length }})
      li: router-link(to="/components") Components ({{ components.length }})
      li: router-link(to="/store")      Store

    .search-bar: input(v-model="q" autofocus spellcheck="false" @input="search")

    <!-- route's list -->
    ul.routes(v-show="showRoutes")
      li(v-for="route in filterRoutes")
        router-link(:to="'/routes/'+route.paths.join('.')") {{ route.paths.join('/') }}

    <!-- component's list -->
    ul.components(v-show="showComponents")
      li(v-for="component in filterComponents")
        router-link(:to="'/components/'+component.name") {{ component.name }}
</template>


<script lang="coffee">
  module.exports =

    data: ->
      title:      window.title ? 'VUE DOCS'
      routes:     window.routes
      components: window.components
      q: ''

    computed:
      showRoutes:     -> @$route.name is 'routes'     or @$route.name is 'route'
      showComponents: -> @$route.name is 'components' or @$route.name is 'component'

      filterRoutes: ->
        q = @q.replace(/^\s+|\s+&/g, '').toLowerCase()
        if q
          @routes.filter (route) => route.path.toLowerCase().indexOf(q) > -1
        else
          @routes

      filterComponents: ->
        q = @q.replace(/^\s+|\s+&/g, '').toLowerCase()
        if q
          @components.filter (component) => component.name.toLowerCase().indexOf(q) > -1
        else
          @components

    watch:
      '$route.name': (name, oldname) ->
        return if name is 'routes'     and oldname is 'route'
        return if name is 'route'      and oldname is 'routes'
        return if name is 'components' and oldname is 'component'
        return if name is 'component'  and oldname is 'components'
        return if name is 'stores'     and oldname is 'store'
        return if name is 'store'      and oldname is 'stores'
        @q = ''

    methods:
      search: (event) ->
        @q = event.target.value
</script>


<style lang="less" scoped>
  #side-bar{
    position: fixed;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    width: 300px;
    padding: 20px 0;
    border-right: 1px solid rgba(0, 0, 0, 0.07);
    .search-bar{
      box-sizing: border-box;
      padding: 0 17px;
      input{
        box-sizing: border-box;
        margin-bottom: 12px;
        padding: 0 8px;
        width: 100%;
        height: 34px;
        font-size: 15px;
        font-weight: bold;
        color: #7f8c8d;
        background-color: #fafbfc;
        border: 1px solid rgb(209, 213, 218);
        border-radius: 3px;
        outline: none;
        box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
      }
    }
    .title{
      margin-bottom: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: 300;
    }
    ul{
      li{
        height: 36px;
        display: flex;
        align-items: stretch;
        a{
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 22px;
          width: 100%;
          font-size: 15px;
          font-weight: 500;
          color: #364149;
          text-decoration: none;
        }
      }
      li:hover{
        background-color: #F4FBF8;
        a{
          color: #42b983;
        }
      }
    }
    ul.first{
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      li{
        a{
          font-size: 15px;
          font-weight: 600;
          color: #364149;
        }
      }
      li:hover{
        a{
          color: #42b983;
        }
      }
    }
  }
</style>