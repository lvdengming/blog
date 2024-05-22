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
                content: 'width=device-width,initial-scale=1,user-scalable=no'
            }
        ],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/portrait128.png' }],
        [
            'link',
            {
                rel: 'mask-icon',
                href: '/icons/portrait128.svg',
                color: '#3eaf7c'
            }
        ],
        [
            'meta',
            {
                name: 'msapplication-TileImage',
                content: '/icons/portrait128.png'
            }
        ],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['meta', { name: 'baidu-site-verification', content: 'code-VjoGmCBp2v' }],
        ['meta', { name: 'description', content: '吕登名的技术博客~' }],
        [
            'meta',
            {
                name: 'keywords',
                content:
                    '吕登名,lvdengming,博客,前端,后端,算法,JS,JavaScript,开发,编程,编程知识,CSS,Nginx,Docker,Shell,Nest,Flutter'
            }
        ]
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    markdown: {
        externalLinks: {
            target: '_blank',
            rel: 'nofollow noopener noreferrer'
        }
    },
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
            socialLinks: [{ icon: 'reco-github', link: 'https://github.com/lvdengming' }]
        },
        friendLink: [
            {
                title: '西瓜皮儿',
                desc: 'Enjoy your grow up!',
                logo: ImgPath.HDY,
                link: 'https://coderhdy.com'
            }
        ],
        valineConfig: {
            appId: 'T8i2WDyg4UVySXYpwe2NnsHR-gzGzoHsz',
            appKey: 'rG0d5JeIzsdwpW2yWXunxwO8'
        },
        record: '蜀ICP备2023006422号-1',
        recordLink: 'https://beian.miit.gov.cn',
        startYear: '2022'
    },
    plugins: [
        '@vuepress/pwa',
        {
            serviceWorker: true,
            updatePopup: true
        },
        '@vuepress/plugin-medium-zoom',
        '@vuepress-reco/back-to-top',
        '@vuepress-reco/loading-page',
        '@vuepress-reco/comments',
        '@vuepress-reco/pagation',
        '@vuepress/last-updated'
    ]
};
