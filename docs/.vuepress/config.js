/**
 * @author lvdengming
 * @date 2022-12-05
 */

module.exports = {
  title: 'ming',
  description: 'A blog website of lvdengming',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  port: 8080,
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    author: 'lvdengming',
    authorAvatar: 'https://sm.ms/image/dafqtRsmwOzcAF6',
    logo: 'https://sm.ms/image/dafqtRsmwOzcAF6',
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    noFoundPageByTencent: false,
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/lvdengming/blog' }
    ],
    blogConfig: {
      tag: {
        location: 2,
        text: 'Tag'
      },
      category: {
        location: 3,
        text: 'Category'
      },
      socialLinks: [
        { icon: 'reco-github', link: 'https://github.com/lvdengming' }
      ]
    },
    friendLink: [
      {
        title: '西瓜皮儿',
        desc: 'Enjoy your grow up!',
        logo: 'https://sm.ms/image/VXyGOH6KRoxkbqt',
        link: 'https://coderhdy.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://sm.ms/image/cUPOgQq4G2i1oAS",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com'
      }
    ],
    valineConfig: {
      appId: 'T8i2WDyg4UVySXYpwe2NnsHR-gzGzoHsz',
      appKey: 'rG0d5JeIzsdwpW2yWXunxwO8'
    }
  },
  plugins: [
    '@vuepress/plugin-medium-zoom',
    '@vuepress-reco/back-to-top',
    '@vuepress-reco/loading-page',
    '@vuepress-reco/comments',
    '@vuepress-reco/pagation',
    '@vuepress-reco/kan-ban-niang'
  ]
};
