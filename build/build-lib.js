'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'es5', 'lib', 'lib-temp')
shell.exec('npm run build')
shell.exec('npm run build:ts')
shell.exec('mkdir lib/')
shell.exec('mkdir lib/styles')
shell.exec('cp -r lib-temp/src/* lib/')
shell.exec('cp -r dist/css/** lib/styles/')
shell.exec('cp src/components/paths.json lib/components/')
shell.rm('-rf', 'dist/types')
shell.rm('-rf', 'lib-temp')
