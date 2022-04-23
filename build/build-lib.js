'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'es5', 'lib', 'lib-temp')
shell.exec('npm run build:ts')
shell.exec('npm run build:es5')
shell.exec('npm run build:lib')
shell.exec('npm run build')
shell.rm('-rf', 'lib-temp')
