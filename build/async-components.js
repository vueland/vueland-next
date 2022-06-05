const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, '../src/index.ts'), 'utf-8', (err, data) => {
  fs.writeFile(path.resolve(__dirname, '../src/temporary.txt'), data, err => console.log(err))

  const newData = data.replace(
    'import { components } from \'./components\'',
    'import components from \'./async\''
  )

  fs.unlinkSync(path.resolve(__dirname, '../src/index.ts'))

  process.nextTick(() => {
    fs.writeFile(path.resolve(__dirname, '../src/index.ts'), newData, err => console.log(err))
  })
})
