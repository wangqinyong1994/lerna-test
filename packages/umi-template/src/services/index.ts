import request from '@/utils/request';

// h5登录
export const login = async (data: any) =>
  request('/gridcloud-authcenter/login', {
    method: 'POST',
    data,
  });
// 政务微信登录
export const loginZWWX = async (data: any) =>
  request('/gridcloud-authcenter/auth', {
    method: 'POST',
    data,
  });
// 根据token获取用户信息
export const viewUserInfo = async (data: any) =>
  request('/gridcloud-usercenter/userManage/viewUserInfo', {
    method: 'POST',
    data,
  });

// 根据token获取用户当前管理区域
export const viewSuperviseOrg = async (data: any) =>
  request('/gridcloud-usercenter/orgManage/viewSuperviseOrg', {
    method: 'POST',
    data,
  });
// 字典枚举版本号检测
export const propertydictManageVersion = async (data: any) =>
  request('/gridcloud-gridcenter/propertydictManage/version', {
    method: 'GET',
    data,
  });
// 字典枚举文档
export const queryAll = async (data: any) =>
  request('/gridcloud-gridcenter/propertydictManage/query/all', {
    method: 'GET',
    data,
  });
