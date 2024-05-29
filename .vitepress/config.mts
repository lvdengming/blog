import { createRequire } from 'module';
import { type DefaultTheme, defineConfig } from 'vitepress';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const devDirs: string[] = ['css', 'flutter', 'javascript', 'mini-program', 'nest', 'node'];
const nonDevDirs: string[] = ['design', 'example', 'git', 'dev-ops'];
const collectDirs: string[] = ['collect'];

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Dengming's Blog",
    description: pkg.description,
    srcDir: './src',
    cleanUrls: true,
    lastUpdated: true,
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: 'local'
        },
        nav: nav(),
        sidebar: sidebar(),
        socialLinks: [{ icon: 'github', link: 'https://github.com/lvdengming/blog' }],
        lastUpdated: {
            text: '最后更新于'
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
            text: '开发',
            link: '/css/note',
            activeMatch: getRegStr(devDirs)
        },
        {
            text: '非开发',
            link: '/design/collect',
            activeMatch: getRegStr(nonDevDirs)
        },
        {
            text: '收藏',
            link: '/collect/common-use',
            activeMatch: getRegStr(collectDirs)
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
        ...getSidebar(collectDirs, sidebarCollect)
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
            text: 'Example',
            base: '/example/',
            collapsed: false,
            items: [
                {
                    text: 'Markdown Extension Examples',
                    link: 'markdown-examples'
                },
                {
                    text: 'Runtime API Examples',
                    link: 'api-examples'
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
                    text: '在 VSCode 中使用 Shell 终端（Git-Bash）',
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
                }
            ]
        }
    ];
}
