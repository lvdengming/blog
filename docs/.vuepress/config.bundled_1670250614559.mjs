// docs/.vuepress/config.ts
import { defineConfig } from 'vuepress/config';
var config_default = defineConfig({
  title: "ming's blog",
  description: 'A blog website of lvdengming',
  port: 8080,
  configureWebpack: {
    resolve: {
      alias: {
        '@imgs': 'imgs',
      },
    },
  },
});
export { config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBhdXRob3IgbHZkZW5nbWluZ1xuICogQGRhdGUgMjAyMi0xMi0wNVxuICovXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiAnbWluZ1xcJ3MgYmxvZycsXG4gIGRlc2NyaXB0aW9uOiAnQSBibG9nIHdlYnNpdGUgb2YgbHZkZW5nbWluZycsXG4gIHBvcnQ6IDgwODAsXG4gIGNvbmZpZ3VyZVdlYnBhY2s6IHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQGltZ3MnOiAnaW1ncydcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUtBO0FBRUEsSUFBTyxpQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sa0JBQWtCO0FBQUEsSUFDaEIsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
