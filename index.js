#!/usr/bin/env node

require('colors')
const fs      = require('fs-extra')
const yargs   = require('yargs')
const phantom = require('phantom')
const parse   = require('./src/parse')

argv = yargs
  .alias('r', 'router')
  .argv


url = argv._[0]
out = argv._[1]


;(async function() {

  const instance = await phantom.create()
  const page = await instance.createPage()


  await page.on('onLoadFinished', async function(status){
    await page.evaluate(parse)
  })

  await page.on('onConsoleMessage', function(message){
    if(/^VUE-DOCS-MESSAGE-DONE:/.test(message)){
      message = message.slice(22)
      console.log(message.green);
    }

    if(/^VUE-DOCS-MESSAGE-FAIL:/.test(message)){
      message = message.slice(22)
      console.log(message.red);
    }

    if(/^VUE-DOCS-EXIT:/.test(message)){
      instance.exit()

      json = message.slice(14)
      json = JSON.parse(json)
      routes = json.routes
      components = json.components

      console.log('format data success'.green)

      fs.removeSync(__dirname + '/web/data')
      fs.ensureDirSync(__dirname + '/web/data')
      fs.writeFileSync(__dirname + '/web/data/routes.js', 'window.routes = ' + JSON.stringify(routes))
      fs.writeFileSync(__dirname + '/web/data/components.js', 'window.components = ' + JSON.stringify(components))

      console.log('create website success'.green)
    }
  })


  const status = await page.open(url)
  if(status === 'success')
    console.log('website found'.green);
  else
    console.log('website not found'.red);


  function parseComponents(){

  }

})();