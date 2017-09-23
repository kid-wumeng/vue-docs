module.exports = function(){
  if(window.router){
    var componentDict = {}
    parseRoutes(window.router).then(function(routes){
      formatRoutes(routes)
      var components = map2Array(componentDict)
      components.sort(function(c1, c2){
        return c1.name.localeCompare(c2.name)
      })
      var json = JSON.stringify({
        routes: routes,
        components: components
      })
      console.log('VUE-DOCS-EXIT:' + json);
    })
  }


  function parseRoutes(router){
    routes = router.options.routes
    return Promise.all(routes.map(function(route){
      return parseRoute(route)
    }))
  }


  function parseRoute(route){
    return fetchComponent(route.component).then(function(rootComponent){
      var promise = traverse(rootComponent, '$root', null)
      console.log('VUE-DOCS-MESSAGE-DONE:' + 'route parse success: ' + rootComponent.__file)
      return promise
    })
  }


  function traverse(node, name, parent){
    var components = node.components
    if(components){
      components = map2Array(components)
      return Promise.all(components.map(function(component){
        return fetchComponent(component).then(function(component){
          return traverse(component, component.name, node)
        })
      })).then(function(children){
        return getNode(name, node, children)
      })
    }else{
      return getNode(name, node)
    }
  }


  function map2Array(componentMap){
    array = []
    for(var name in componentMap){
      component = componentMap[name]
      component.name = name
      array.push(component)
    }
    return array
  }


  function fetchComponent(component){
    if(typeof(component) === 'function')
      return component()
    else
      return Promise.resolve(component)
  }


  function getNode(name, component, children){
    var node = {
      name: name,
      path: component.__file
    }

    if(children)
      node.children = children

    // console.log(component);
    getDesc(node, component)
    getDetails(node, component)
    getProps(node, component)

    if(name !== '$root'){
      if(componentDict[name])
        componentDict[name].count++
      else
        componentDict[name] = node
        componentDict[name].count = 1
    }

    return node
  }


  function getDesc(node, component){
    var desc = component.desc
    if(typeof(desc) === 'string')
      node.desc = desc
  }


  function getDetails(node, component){
    var details = component.details
    if(typeof(details) === 'string')
      node.details = details
  }


  function getProps(node, component){
    if(!component.props) return

    var props = {}
    var name, prop
    for(name in component.props){
      prop = component.props[name]
      formatPropType(prop)
      props[name] = prop
    }
    node.props = props
  }


  function formatPropType(prop){
    if(prop){
      if(typeof(prop.type) === 'object' && prop.type !== null){
        prop.type = prop.type.name
      }
    }
  }


  function formatRoutes(routes){
    var splitRoutes   = []
    var minSplitRoute = null
    var i, j, route, splitRoute, min_i

    for(i=0; i < routes.length; i++){
      route = routes[i].path
      route = route.replace(/^\//, '')
      splitRoute = route.split('/')
      splitRoutes.push(splitRoute)

      if(minSplitRoute === null){
         minSplitRoute = splitRoute
         min_i = 0
      }else if(splitRoute.length < minSplitRoute.length){
         minSplitRoute = splitRoute
         min_i = i
      }
    }

    var same_len = minSplitRoute.length
    for(i=0; i < splitRoutes.length; i++){
      if(i === min_i) continue
      splitRoute = splitRoutes[i]
      for(j=0; j < minSplitRoute.length; j++){
        if(splitRoute[j] !== minSplitRoute[j]){
          if(j < same_len){
            same_len = j
          }
        }
      }
    }

    for(i=0; i < splitRoutes.length; i++){
      splitRoute = splitRoutes[i]
      if(splitRoute[splitRoute.length - 1] === 'index.vue'){
        splitRoute.pop()
      }
      routes[i].paths = splitRoute.slice(same_len)
      routes[i].path = routes[i].paths.join('/')
    }
  }

}