import { createRequire } from 'module';
import { type DefaultTheme, defineConfig } from 'vitepress';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const devDirs: string[] = ['css', 'flutter', 'javascript', 'mini-program', 'nest', 'node'];
const nonDevDirs: string[] = ['design', 'example', 'git', 'dev-ops'];
const collectDirs: string[] = ['collect'];
const interviewDirs: string[] = ['interview', 'handwrite', 'data-structure-algorithm', 'leet-code'];

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Dengming's Blog",
    description: pkg.description,
    srcDir: './src',
    base: '/blog/',
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true,
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        // 框架已添加 description
        // ['meta', { name: 'description', content: pkg.description }],
        [
            'meta',
            {
                name: 'keywords',
                content:
                    '吕登名,lvdengming,前端,Vue,React,Angular,JS,JavaScript,开发,编程,编程知识,CSS,Nginx,Docker,Shell,Nest,Flutter'
            }
        ],
        [
            'script',
            { id: 'print-info' },
            `
                console.log('欢迎来到我的博客');
                console.log('Welcome to my blog.')
                console.log('Contact me: lvdengming@foxmail.com');
            `
        ]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: 'local'
        },
        nav: nav(),
        socialLinks: [{ icon: 'github', link: 'https://github.com/lvdengming/blog' }],
        sidebar: sidebar(),
        outline: {
            label: '页面导航'
        },
        editLink: {
            text: '在 GitHub 上编辑此页面',
            pattern: 'https://github.com/lvdengming/blog/edit/master/src/:path'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        footer: {
            message: '基于 MIT 许可发布',
            copyright: `版权所有 © 2017-${new Date().getFullYear()} 吕登名`
        }
    }
});

function nav(): DefaultTheme.NavItem[] {
    const getRegStr = (dirs: string[]): string => {
        const str = dirs.join('|');
        return `/${str}/`;
    };

    return [
        {
            text: '首页',
            link: '/'
        },
        {
            text: 'Dev',
            link: '/css/note',
            activeMatch: getRegStr(devDirs)
        },
        {
            text: 'Non-Dev',
            link: '/design/collect',
            activeMatch: getRegStr(nonDevDirs)
        },
        {
            text: '收藏',
            link: '/collect/common-use',
            activeMatch: getRegStr(collectDirs)
        },
        {
            text: '面试',
            link: '/interview/question',
            activeMatch: getRegStr(interviewDirs)
        }
    ];
}

function sidebar(): DefaultTheme.SidebarMulti {
    type SidebarFunc = () => DefaultTheme.SidebarItem[];
    const getSidebar = (dirs: string[], func: SidebarFunc): DefaultTheme.SidebarMulti => {
        const sidebar: DefaultTheme.SidebarMulti = {};
        for (const dir of dirs) {
            const path = `/${dir}/`;
            sidebar[path] = func();
        }

        return sidebar;
    };

    return {
        ...getSidebar(devDirs, sidebarDev),
        ...getSidebar(nonDevDirs, sidebarNonDev),
        ...getSidebar(collectDirs, sidebarCollect),
        ...getSidebar(interviewDirs, sidebarInterview)
    };
}

function sidebarDev(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'CSS',
            base: '/css/',
            collapsed: false,
            items: [
                {
                    text: '学习笔记',
                    link: 'note'
                }
            ]
        },
        {
            text: 'Flutter',
            base: '/flutter/',
            collapsed: false,
            items: [
                {
                    text: 'Flutter 环境搭建',
                    link: 'get-started'
                },
                {
                    text: 'Dart 学习笔记',
                    link: 'dart'
                },
                {
                    text: 'Flutter 学习笔记',
                    link: 'note'
                }
            ]
        },
        {
            text: 'JavaScript',
            base: '/javascript/',
            collapsed: false,
            items: [
                {
                    text: 'Canvas 手册',
                    link: 'canvas'
                },
                {
                    text: 'Chrome 调试指南',
                    link: 'debug'
                },
                {
                    text: '前端埋点方案',
                    link: 'tracing'
                },
                {
                    text: 'JSONP',
                    link: 'jsonp'
                }
            ]
        },
        {
            text: 'MiniProgram',
            base: '/mini-program/',
            collapsed: false,
            items: [
                {
                    text: '小程序学习笔记',
                    link: 'note'
                }
            ]
        },
        {
            text: 'Node',
            base: '/node/',
            collapsed: false,
            items: [
                {
                    text: '第三方模块收藏',
                    link: 'collect'
                },
                {
                    text: 'Node 模块加载',
                    link: 'mjs-cjs'
                },
                {
                    text: 'npm 学习笔记',
                    link: 'npm-note'
                }
            ]
        },
        {
            text: 'Nest',
            base: '/nest/',
            collapsed: false,
            items: [
                {
                    text: 'Nest 学习指南',
                    link: 'get-started'
                }
            ]
        }
    ];
}

function sidebarNonDev(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Design',
            base: '/design/',
            collapsed: false,
            items: [
                {
                    text: '设计收藏',
                    link: 'collect'
                }
            ]
        },
        {
            text: 'Git',
            base: '/git/',
            collapsed: false,
            items: [
                {
                    text: '连接远程仓库',
                    link: 'connect-remote-repo'
                },
                {
                    text: 'commit type 说明',
                    link: 'commit-type'
                }
            ]
        },
        {
            text: 'DevOps',
            base: '/dev-ops/',
            collapsed: false,
            items: [
                {
                    text: 'hosts 文件 —— 在本地实现主机名与域名映射',
                    link: 'hosts'
                },
                {
                    text: '在 VSCode 中使节流（throttle）用 Shell 终端（Git-Bash）',
                    link: 'use-shell'
                },
                {
                    text: '系统常用命令',
                    link: 'command'
                },
                {
                    text: '创建远程服务器连接命令',
                    link: 'create-connect-script'
                },
                {
                    text: '服务器初始化',
                    link: 'initialize'
                },
                {
                    text: '本地如何传输文件到远程服务器',
                    link: 'transmit'
                },
                {
                    text: 'docker 常用命令',
                    link: 'docker-command'
                },
                {
                    text: '部署服务',
                    link: 'deploy-serve'
                },
                {
                    text: '部署 SSL 服务',
                    link: 'use-ssl'
                }
            ]
        }
    ];
}

function sidebarCollect(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Collection',
            base: '/collect/',
            collapsed: false,
            items: [
                {
                    text: '我的收藏',
                    link: 'common-use'
                },
                {
                    text: 'VSCode 使用技巧',
                    link: 'vscode-skill'
                },
                {
                    text: 'Mac & Linux 学习笔记',
                    link: 'mac-linux-note'
                },
                {
                    text: '知识点',
                    link: 'knowledge-section'
                }
            ]
        }
    ];
}

function sidebarInterview(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '面试实战',
            base: '/interview/',
            collapsed: false,
            items: [
                // {
                //     text: '2024-面试记录',
                //     link: '2024'
                // },
                {
                    text: '面试知识点（一）',
                    link: 'question'
                },
                {
                    text: '面试知识点（二）',
                    link: 'question-2'
                },
                {
                    text: 'JS',
                    link: 'js'
                },
                {
                    text: 'CSS',
                    link: 'css'
                },
                {
                    text: 'NodeJS',
                    link: 'node'
                },
                {
                    text: '前端框架',
                    link: 'framework'
                },
                {
                    text: '前端工程化',
                    link: 'engineering'
                },
                {
                    text: '计算机网络',
                    link: 'network'
                },
                {
                    text: '代码执行结果',
                    link: 'code-result'
                },
                {
                    text: '问题收藏',
                    link: 'collection'
                }
            ]
        },
        {
            text: 'Handwrite',
            base: '/handwrite/',
            collapsed: true,
            items: [
                {
                    text: 'CSS 手写',
                    link: 'css'
                },
                {
                    text: '控制并发请求',
                    link: 'concurrent-request'
                },
                {
                    text: '防抖和节流',
                    link: 'debounce-throttle'
                },
                {
                    text: '函数方法',
                    link: 'function-method'
                },
                {
                    text: 'LazyMan',
                    link: 'lazy-man'
                },
                {
                    text: '实现 add 方法',
                    link: 'add'
                },
                {
                    text: '实现 firstUniqueChar 方法',
                    link: 'first-unique-char'
                },
                {
                    text: '倒计时',
                    link: 'count-down'
                },
                {
                    text: '双栈模拟队列',
                    link: 'dual-stack-analog-queue'
                },
                {
                    text: '手写 Promise（同步版本）',
                    link: 'promise-sync'
                },
                {
                    text: '手写 Promise（异步版本）',
                    link: 'promise-async'
                },
                {
                    text: '手写 Promise（完整版）',
                    link: 'promise'
                },
                {
                    text: '使用 XHR 进行网络请求',
                    link: 'xhr-request'
                }
            ]
        },
        {
            text: '数据结构与算法',
            base: '/data-structure-algorithm/',
            collapsed: true,
            items: [
                {
                    text: '二叉树',
                    link: 'binary-tree'
                },
                {
                    text: '二叉搜索树',
                    link: 'binary-search-tree'
                },
                {
                    text: '红黑树',
                    link: 'red-black-tree'
                },
                {
                    text: '堆',
                    link: 'heap'
                },
                {
                    text: '二分查找',
                    link: 'binary-search'
                },
                {
                    text: '堆排序',
                    link: 'heap-sort'
                }
            ]
        },
        {
            text: '力扣',
            base: '/leet-code/',
            collapsed: true,
            items: [
                {
                    text: '基础',
                    link: 'base'
                },
                {
                    text: '题目分类',
                    link: 'classify'
                },
                {
                    text: 'TOP 100',
                    link: 'top-100'
                },
                {
                    text: '题库',
                    link: 'problem-list'
                }
            ]
        }
    ];
}
