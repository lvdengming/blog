const { ImgPath } = require('./constant');

module.exports = {
  base: '/blog/',
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
    ],
    valineConfig: {
      appId: 'T8i2WDyg4UVySXYpwe2NnsHR-gzGzoHsz',
      appKey: 'rG0d5JeIzsdwpW2yWXunxwO8',
    },
    record: '蜀ICP备2023006422号-1',
    recordLink: 'https://beian.miit.gov.cn',
    startYear: '2022',
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
