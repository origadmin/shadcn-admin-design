import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  server: {
    base: '/',
    htmlFallback: 'index',
    // historyApiFallback: {
    //   index: '/index.html',
    // },
  },
  source: {
    entry: {
      index: './src/index.tsx',
      dashboard: './src/app/dashboard/page.tsx',
      login: './src/app/login/page.tsx',
    },
  },
  plugins: [pluginReact()],
});
