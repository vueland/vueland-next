'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'es5', 'lib', 'lib-temp')
shell.exec('npm run build')
shell.exec('npm run build:ts')
shell.exec('cp -r lib-temp/src/* dist/')
shell.exec('cp src/paths.json dist/')
shell.exec('cp -r dist/types/src/* dist/types')
shell.rm('-rf', 'dist/types/src')
shell.rm('-rf', 'lib-temp')
