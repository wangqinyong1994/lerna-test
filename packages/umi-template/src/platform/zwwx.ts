/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Noop } from 'umi';
import { loginZWWX, viewUserInfo } from '@/services';
import { checkVersion } from '@/utils';
import { Authorization, USERINFO, ORGINFO } from '@/utils/storageConst';
import { getZwwxModuleConfig } from './zwwx.config';

// wechatZW
class ZWWX {
  options: Noop;

  constructor(options: Noop) {
    const { appSecret, apiSecret } = getZwwxModuleConfig();
    const { apiUrl, appKey, authCode, platform, oldRender } = options;
    this.options = options;
    this.loginUserAuth({
      apiUrl,
      appKey,
      authCode,
      apiSecret,
      platform,
      appSecret,
      oldRender,
    });
  }

  async loginUserAuth({ oldRender, ...params }) {
    try {
      const {
        success,
        data: { accessToken },
      } = await loginZWWX(params);
      if (success) {
        if (accessToken) {
          localStorage.setItem(Authorization, accessToken);
        }
        this.getUserMsg();
        oldRender && oldRender();
        checkVersion();
      }
    } catch (error) {}
  }

  async getUserMsg() {
    try {
      const { success, data } = await viewUserInfo({});
      if (success) {
        localStorage.removeItem(ORGINFO);
        localStorage.setItem(USERINFO, JSON.stringify(data));
      }
    } catch (error) {}
  }
}
export default ZWWX;
