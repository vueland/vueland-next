const ru = require('./configs/sidebar/ru')

module.exports = {
  base: '/',
  lang: 'en-US',
  title: 'Vueland',
  description: 'components library',
  serviceWorker: true,
  templateDev: 'docs/.vuepress/public/index.dev.html',
  templateSSR: 'docs/.vuepress/public/index.ssr.html',
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/69472704?s=200&v=4',
    docsDir: 'docs',
    navbar: [
      {
        text: 'На главную',
        link: '/',
      },
      {
        text: 'Руководство',
        link: '/guide/',
      },
      {
        text: 'Компоненты',
        link: '/components/',
      },
      {
        text: 'Плагины',
        link: '/plugins/',
      },
      {
        text: 'External',
        link: 'https://google.com',
      },
    ],
    sidebar: {
      ...ru,
    },
  },
  markdown: {
    links: {
      externalIcon: true,
    },
  },
}
