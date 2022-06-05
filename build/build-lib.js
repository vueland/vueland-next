'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'es5', 'lib', 'lib-temp')
shell.exec('npm run build')
shell.exec('node build/async-components.js')
shell.exec('npm run build:ts')
shell.exec('mkdir lib/')
shell.exec('cp -r lib-temp/src/* lib/')
shell.exec('cp src/paths.json lib/')
shell.exec('node build/sync-components.js')
shell.rm('-rf', 'dist/types')
shell.rm('-rf', 'lib-temp')
