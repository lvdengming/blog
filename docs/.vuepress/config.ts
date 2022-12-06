/**
 * @author lvdengming
 * @date 2022-12-05
 */

import { defineConfig } from 'vuepress/config';

export default defineConfig({
  title: 'ming\'s blog',
  description: 'A blog website of lvdengming',
  port: 8080,
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': 'assets'
      }
    }
  },
  themeConfig: {
    logo: '/assets/img/logo.png',
    sidebar: 'auto',
    lastUpdated: '最后修改于',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '前端',
        items: [
          { text: '简介', link: '/front-end/' },
          { text: '小程序', link: '/front-end/miniprogram/' }
        ]
      },
      { text: '后端', link: '/back-end/' },
      {
        text: '其它',
        items: [
          { text: '力扣', link: '/other/leetcode/' },
          { text: '收藏', link: '/other/collect/' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/lvdengming/blog' }
    ]
  }
});
