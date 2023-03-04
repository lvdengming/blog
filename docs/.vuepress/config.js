const { ImgPath } = require('./constant');

module.exports = {
  title: 'ming',
  description: 'A blog website of lvdengming',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  port: 8080,
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    author: 'lvdengming',
    authorAvatar: ImgPath.PROFILE,
    logo: ImgPath.PROFILE,
    startYear: '2023',
    startYear: '2023',
    sidebar: 'auto',
    lastUpdated: '上次修改',
    lastUpdated: 'Last Updated',
    lastUpdated: '上次修改',
    noFoundPageByTencent: false,
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/lvdengming/blog' },
    ],
    blogConfig: {
      tag: {
        location: 2,
        text: 'Tag',
      },
      category: {
        location: 3,
        text: 'Category',
      },
      socialLinks: [
        { icon: 'reco-github', link: 'https://github.com/lvdengming' },
      ],
    },
    friendLink: [
      {
        title: '西瓜皮儿',
        desc: 'Enjoy your grow up!',
        logo: ImgPath.HDY,
        link: 'https://coderhdy.com',
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: ImgPath.RECO,
        link: 'https://vuepress-theme-reco.recoluan.com',
      },
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com',
      },
    ],
    valineConfig: {
      appId: 'T8i2WDyg4UVySXYpwe2NnsHR-gzGzoHsz',
      appKey: 'rG0d5JeIzsdwpW2yWXunxwO8',
    },
  },
  plugins: [
    '@vuepress/plugin-medium-zoom',
    '@vuepress-reco/back-to-top',
    '@vuepress-reco/loading-page',
    '@vuepress-reco/comments',
    '@vuepress-reco/pagation',
    '@vuepress/last-updated',
  ],
};
