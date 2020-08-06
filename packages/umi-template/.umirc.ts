import { defineConfig } from 'umi';
import * as path from 'path';

export default defineConfig({
  define: {
    'process.env': {
      TQ_ENV: process.env.TQ_ENV,
      NODE_ENV: process.env.NODE_ENV,
    },
  },
  ignoreMomentLocale: true,
  alias: {
    '@public': path.resolve(__dirname, './public'),
    '@config': path.resolve(__dirname, './config'),
  },
  plugins: ['@alitajs/hd'],
  proxy: {
    // '/gridcloud-authcenter': {
    //   target: 'http://192.168.10.104:25001/',
    //   changeOrigin: true,
    // },
    // '/gridcloud-gridcenter': {
    //   target: 'http://192.168.10.104:25001/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/gridcloud-gridcenter': '',
    //   },
    // },
    // '/gridcloud-addresscenter': {
    //   target: 'http://192.168.10.104:25001/',
    //   changeOrigin: true,
    // },
    // '/gridcloud-usercenter': {
    //   target: 'http://192.168.10.104:25001/',
    //   changeOrigin: true,
    // },
    '/gridcloud-authcenter': {
      target: 'http://192.168.100.242:5080/',
      changeOrigin: true,
    },
    // '/gridcloud-gridcenter': {
    //   target: 'http://192.168.10.104:25000/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/gridcloud-gridcenter': '',
    //   },
    // },
    '/gridcloud-gridcenter': {
      target: 'http://192.168.100.242:5080/',
      changeOrigin: true,
    },
    '/gridcloud-addresscenter': {
      target: 'http://192.168.100.242:5080/',
      changeOrigin: true,
    },
    '/gridcloud-usercenter': {
      target: 'http://192.168.100.242:5080/',
      changeOrigin: true,
    },
  },
  runtimePublicPath: true,
  history: {
    type: 'hash',
  },
});
