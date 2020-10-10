const env = process.env.NODE_ENV

module.exports = {
  presets: [
    '@babel/preset-env',
    "@babel/typescript"
  ],
  plugins: [
    [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      {
        loose: true
      }
    ],
    [
      'component',
      {
        libraryName: 'retn',
        libDir: 'dist',
      }
    ]
  ],
  env: {
    es5: {
      presets: [
        '@babel/preset-env'
      ]
    },
    lib: {
      presets: [
        ['@babel/preset-env', {
          targets: 'last 1 chrome version',
          modules: false,
        }],
      ],
    },
  }
}

if (['lib', 'es5'].includes(env)) {
  module.exports.plugins.push('./build/babel-transform-sass-paths.js')
}
