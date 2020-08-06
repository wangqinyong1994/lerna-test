import { extend } from 'umi-request';
import { history } from 'umi';
import { Toast } from 'antd-mobile';
import querystring from 'query-string';
import envConfig from '@/env.config';

const { baseURL } = envConfig;
const codeMessage: {
  [code: string]: string;
} = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = ({ response }: { response: Response }) => {
  if (response && response.status) {
    const content = codeMessage[response.status] || response.statusText;
    if (response.status === 401) {
      Toast.fail(content, 2);
      history.replace('/login');
    } else {
      Toast.fail(content, 2);
    }
  } else if (!response) {
    Toast.fail('网络异常');
  }

  return response;
};

const request = extend({
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  errorHandler,
});

request.interceptors.request.use((url, options) => {
  const { data, method } = options;
  const domin = process.env.NODE_ENV === 'production' ? baseURL : '';
  const Authorization = localStorage.getItem('Authorization') || '';

  if (method === 'get') {
    return {
      url: `${domin}${url}?${querystring.stringify(data)}`,
      options: {
        ...options,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization,
        },
      },
    };
  }
  if (method === 'post') {
    return {
      url: domin + url,
      options: {
        ...options,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization,
        },
      },
    };
  }
  return {
    url: domin + url,
    options,
  };
});

// 200的error处理
request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  if (!res.success) {
    if (res.msg) {
      Toast.fail(res.msg, 2);
    }
  }
  return response;
});

export default request;
