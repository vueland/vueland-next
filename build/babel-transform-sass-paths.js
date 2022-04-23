const { join, dirname, relative } = require('path')
const wrapListener = require('babel-plugin-detective/wrap-listener')

module.exports = wrapListener(listener, 'transform-sass-paths')

function listener(path, file) {
  if (path.isLiteral() && (path.node.value.endsWith('.sass') || path.node.value.endsWith('.scss'))) {
    const from = dirname(relative(file.opts.cwd, file.opts.filename))
    let to = from.replace(from.split('/')[0], '')

    /** return one step more */
    /** TODO find solution */
    let relativePath = join(relative(from, './' + to), path.node.value)
    relativePath = relativePath.split('/').slice(1).join('/')

    path.node.value = relativePath
  }
}
