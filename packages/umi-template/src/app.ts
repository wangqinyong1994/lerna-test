/* eslint-disable import/no-extraneous-dependencies */
import vw from 'umi-hd/lib/vw';
import { ENV } from '@/utils/storageConst';
import { zwwxInitRedirect } from '@/utils';
import { getZwwxPrismConfig } from '@/platform/zwwx.config';
import TQPrism from './utils/TQPrism';

export function render(oldRender) {
  TQPrism.config(getZwwxPrismConfig());
  TQPrism.ready(async (res) => {
    console.log('success', res);
    const env = TQPrism.getEnv();
    localStorage.setItem(ENV, env);
    if (env === 'wechatZW') {
      zwwxInitRedirect();
      const env = await import('@/platform/zwwx');
      const ZWWX = env.default;
      const { apiUrl, appKey, authCode, envType: platform } = res;
      new ZWWX({
        apiUrl,
        appKey,
        authCode,
        platform,
        oldRender,
      });
    } else {
      oldRender();
    }
  });
  TQPrism.error((res) => {
    console.log('error', res);
  });
}

// 替换根字号大小;
vw(100, 750);
