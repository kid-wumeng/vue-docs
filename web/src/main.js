import Vue       from 'vue'
import VueRouter from 'vue-router'
import App       from './App.vue'


Vue.use(VueRouter)


new Vue({
  el: '#app',
  render: h => h(App),
  router: new VueRouter({
    routes: [{
      name: 'route',
      path: '/routes/:path',
      component: require('./Page/routes/:path')
    },{
      name: 'routes',
      path: '/routes',
      alias: '/',
      component: require('./Page/routes')
    },{
      name: 'component',
      path: '/components/:name',
      component: require('./Page/components/:name')
    },{
      name: 'components',
      path: '/components',
      component: require('./Page/components')
    }]
  })
})
