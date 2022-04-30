'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'es5', 'lib', 'lib-temp')
shell.exec('npm run test')
shell.exec('npm run build:ts')
shell.exec('npm run build')
shell.rm('-rf', 'lib-temp')
