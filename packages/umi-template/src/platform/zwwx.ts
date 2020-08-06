/* eslint-disable class-methods-use-this */
import { Noop } from 'umi';
import { loginZWWX, viewUserInfo } from '@/services';
import { checkVersion } from '@/utils';
import { Authorization, USERINFO } from '@/utils/storageConst';
import { getZwwxModuleConfig } from './zwwx.config';

// wechatZW
// corpId ww3dea69ccbd3a891d
// Todo (政务微信里，会给你一个当前政务微信用户的唯一id，你用这个id去请求政务微信专用的登录接口) 过度页面？ 请求完保存返回值
class ZWWX {
  constructor(options: Noop) {
    const { appSecret, apiSecret } = getZwwxModuleConfig();
    const { apiUrl, appKey, authCode, platform } = options;
    this.loginUserAuth({
      apiUrl,
      appKey,
      authCode,
      apiSecret,
      platform,
      appSecret,
    });
  }

  async loginUserAuth(params) {
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
        checkVersion();
      }
    } catch (error) {}
  }

  async getUserMsg() {
    try {
      const { success, data } = await viewUserInfo({});
      if (success) {
        localStorage.removeItem('ORGINFO');
        localStorage.setItem(USERINFO, JSON.stringify(data));
      }
    } catch (error) {}
  }
}
export default ZWWX;
