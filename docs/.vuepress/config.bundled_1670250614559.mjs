import { defineConfig } from 'vuepress/config';
var config_default = defineConfig({
    title: "ming's blog",
    description: 'A blog website of lvdengming',
    port: 8080,
    configureWebpack: {
        resolve: {
            alias: {
                '@imgs': 'imgs'
            }
        }
    }
});
export { config_default as default };
