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
        '@imgs': 'imgs'
      }
    }
  },
  themeConfig: {
    logo: '/assets/img/logo.jpg',
    nav: [
      { text: 'home', link: '/' },
      { text: 'google', link: 'https://google.com' }
    ]
  }
});
