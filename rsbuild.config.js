const { pluginReact } = require('@rsbuild/plugin-react');
const { defineConfig } = require('@rsbuild/core');

const config = defineConfig({
  server: {
    base: '/',
    htmlFallback: 'index',
  },
  dev: {
    writeToDisk: true,
  },
  html: {
    template: './src/assets/index.html',
  },
  source: {
    entry: {
      index: './src/index.tsx',
      // dashboard: './src/index.tsx',
      // login: './src/index.tsx',
    },
  },
  output: {
    copy: [
      // `./src/assets/image.png` -> `./dist/image.png`
      { from: './public' },
    ],
  },
  plugins: [pluginReact()],
});
export default config;
