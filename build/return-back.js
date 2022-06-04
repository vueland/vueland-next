const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, '../src/temporary.txt'), 'utf-8', (err, data) => {
  fs.unlinkSync(path.resolve(__dirname, '../src/index.ts'))

  fs.writeFile(path.resolve(__dirname, '../src/index.ts'), data, err => {
    !err && fs.unlinkSync(path.resolve(__dirname, '../src/temporary.txt'))
  })
})
