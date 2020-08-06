const { TQ_ENV, NODE_ENV } = process.env;
export interface IEnvConfig {
  baseURL?: string; // 接口域名
  ossConfig?: {
    // oss地址配置
    ossUrl: string;
    prefix: string;
    ossAuthor: string;
  };
}
// 内网配置
// http://192.168.110.148:9080/index.jsp#/bucket/gotoBucketListPage front
const ossConfig = {
  ossUrl: 'http://192.168.110.148:20000/',
  prefix: 'tqOssManager/getObjectByUri/',
  ossAuthor:
    'e3A6InBhdEJhc2VsaW5lQ29sbGNldGlvbiIsb3A6IlRRRlMiLGI6ImZyb250IixhazoiZWVreDQ3QVpIZGJtMVJYSSIsYXM6ImhRVUM3dUdBdnVkRzJJcnNEVmxsb0ExWmRvcGtCSlVhIn0=',
};

const envConfig: IEnvConfig = {};

if (TQ_ENV ? TQ_ENV === 'development' : NODE_ENV === 'development') {
  // 开发
  envConfig.baseURL = 'http://192.168.4.245:8088';
  envConfig.ossConfig = ossConfig;
}

if (TQ_ENV && TQ_ENV === 'alpha') {
  // 内测
  envConfig.baseURL = 'http://192.168.100.242:5080';
  envConfig.ossConfig = ossConfig;
}

if (TQ_ENV && TQ_ENV === 'beta') {
  // 公测
  envConfig.baseURL = 'http://192.168.100.242:5080';
  envConfig.ossConfig = ossConfig;
}

if (TQ_ENV && TQ_ENV === 'zwwx_test') {
  // 政务微信测试
  envConfig.baseURL = 'http://192.168.100.242:5080';
  envConfig.ossConfig = ossConfig;
}

if (TQ_ENV && TQ_ENV === 'zwwx_prod') {
  // 政务微信正式
  envConfig.baseURL = 'http://tianque.oicp.net:21000';
  envConfig.ossConfig = ossConfig;
}

if (TQ_ENV ? TQ_ENV === 'production' : NODE_ENV === 'production') {
  // 开发环境
  // envConfig.baseURL = 'http://tianque.oicp.net:21000';
  // 测试环境
  envConfig.baseURL = 'http://192.168.100.242:5080';
  envConfig.ossConfig = ossConfig;
}

export default envConfig;
