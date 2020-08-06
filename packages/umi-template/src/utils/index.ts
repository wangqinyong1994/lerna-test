import localforage from 'localforage';
import moment from 'moment';
import { Noop, history } from 'umi';
import { queryAll, propertydictManageVersion } from '@/services';
import {
  Authorization as _Authorization,
  DICVERSION,
} from '@/utils/storageConst';
import envConfig from '@/env.config';
import TQPrism from './TQPrism';

const { ossUrl, ossAuthor } = envConfig.ossConfig as any;

type DicEnum = Array<Array<any>>;

export const setToken = ({
  Authorization = '',
}: {
  Authorization?: string;
}): void => {
  localStorage.setItem(_Authorization, Authorization);
};

// 获取本地存储的辖区管理code
export const getOrgCode = () => {
  const orgInfo = localStorage.getItem('ORGINFO');
  const userInfo = localStorage.getItem('USERINFO');
  // // 有设置选设置；无设置选用户身份默认第一项
  if (orgInfo) {
    const { orgCode } = JSON.parse(orgInfo);
    return orgCode;
  }
  if (userInfo) {
    const {
      department: { superviseOrg },
    } = JSON.parse(userInfo);
    const { orgCode } = superviseOrg[0];
    return orgCode;
  }
  return '.';
};

export const getUrlParam = (key: string, type = 'hash') => {
  // eslint-disable-next-line prefer-template
  const reg = new RegExp('[?|&]' + key + '=([^&]+)');
  const match = window.location[type].replace(/\//, '').match(reg);
  return match && match[1];
};

/**
 * 政务微信初始化重定向，根据工作台url后参数${moduleName}定向
 */
export const zwwxInitRedirect = () => {
  const moduleName = getUrlParam('moduleName', 'search');
  if (moduleName === 'house') {
    history.replace('/index');
  } else if (moduleName === 'building') {
    history.replace('/index');
  }
};

export const moment2Date = (val) => {
  if (!val) return undefined;
  return new Date(moment(val).format('YYYY-MM-DD'));
};

export const getDataInLocalforage = (key: string): any =>
  localforage.getItem(key);

export const setDataInLocalforage = async (
  key: string,
  value: any,
  cache = true,
): Promise<any> => {
  try {
    const dataInLocalforage = await getDataInLocalforage(key);
    if (dataInLocalforage && cache) {
      return Promise.resolve(dataInLocalforage);
    }
    await localforage.setItem(key, value);
    return Promise.resolve(value);
  } catch (error) {
    return Promise.reject(error);
  }
};

// 字典项获取
export const getDicEnumItem = async (
  name: string,
  callback?: (value) => any,
): Promise<any> => {
  const data: { [key: string]: any } =
    (await getDataInLocalforage('DicEnum')) || {};
  if (callback) {
    return callback(data[name]);
  }
  return Promise.resolve(data[name]);
};

// 同步字典项筛选
export const dicEnumFilterSync = async (
  arr: DicEnum,
  enhancer?: (val) => any,
) => {
  const obj: Noop = {};
  const _getDicEnumItem = async () => {
    const res = await Promise.all(
      arr.map(async (item) =>
        getDicEnumItem(item[0], (data) => {
          if (enhancer) {
            return enhancer(data);
          }
          return data.map((item) => ({
            label: item.displayname,
            value: item.id,
          }));
        }),
      ),
    );
    arr.forEach((item, index) => {
      obj[item[1]] = res[index];
    });
  };
  await _getDicEnumItem();
  return obj;
};

// 图片上传
export const uploadFile = (img) =>
  new Promise((resolve, reject) => {
    try {
      TQPrism.uploadFile({
        url: `${ossUrl}tqOssManager/putTmpObject?auther=${ossAuthor}`,
        filePath: img.url,
        name: 'uploadFile',
        header: {
          ossobjectconfig: `{"reallyFileName":"${encodeURI(img.file.name)}"}`,
        },
      })
        .then((res) => {
          if (res.statusCode === 200) {
            const result: Noop = {};
            result.taskcenterUrl = res.data
              .match(new RegExp(/url=([^,]+)/))[0]
              .replace('url=', '')
              .replace('url=', '')
              .replace('TQFS://', '');
            result.isTaskCenter = true;
            result.ossUri = res.data
              .match(new RegExp(/uri=([^,]+)/))[0]
              .replace('uri=', '');
            result.fileName = img.file.name;
            resolve(result);
          } else {
            reject(res.errMsg);
          }
        })
        .catch(reject);
    } catch (error) {}
  });

export const uploadAllFile = (imgList = []) => {
  if (!Array.isArray(imgList)) {
    imgList = [];
  }
  const promiseList = imgList.map((item) => uploadFile(item));
  return Promise.all(promiseList);
};

// 设置初始化form内图片
export const setFormInitFiles = (ossKey) => {
  if (ossKey && ossKey.length) {
    return ossKey.map((item, index) => ({
      id: index + 1,
      url: item,
      ossKey: item,
      file: {
        name: item.split('/').slice(-1)[0],
      },
    }));
  }
  return [];
};

// 设置表单picker值
export const renderFormPickerView = (val) => {
  if (typeof val === 'number' || typeof val === 'string') {
    return [Number(val)];
  }
  return undefined;
};

// 获取字典项中文
export const getDicText = (title, value, dicEnum) => {
  if (!dicEnum[title]) return '';
  if (value && Array.isArray(value)) {
    const dic = dicEnum[title];
    const res = value.map(
      (item) => dic.find((dicItem) => dicItem.value === item * 1)?.label,
    );
    return res.join(';');
  }
  const target = dicEnum[title].find((item) => item.value === value * 1)?.label;
  return target || '';
};

// telephone 固定电话 mobilenumber 手机号码
export const renderMobileAndPhone = (telephone, mobilenumber) => {
  if (telephone && mobilenumber) {
    return `${telephone};${mobilenumber}`;
  }
  if (telephone) {
    return telephone;
  }
  if (mobilenumber) {
    return mobilenumber;
  }
  return '';
};

export const getPositionWithDevice = (width) => {
  try {
    const { screenWidth, screenHeight } = TQPrism.getSystemInfoSync();
    return (screenHeight * width) / screenWidth;
  } catch (error) {
    return 0;
  }
};

// 检查字典项版本
export const checkVersion = async () => {
  try {
    const {
      data: { field },
    } = await propertydictManageVersion({});
    const version = localStorage.getItem(DICVERSION);
    if (!version) {
      // 无版本号
      localStorage.setItem(DICVERSION, field);
    } else {
      if (version !== field) {
        // 版本不一致
        const { data } = await queryAll({});
        setDataInLocalforage('DicEnum', data);
        localStorage.setItem(DICVERSION, JSON.stringify(field));
      }
    }
  } catch (error) {}
};

// 初始化字典项
export const initDicEnum = async () => {
  const DicEnum = await getDataInLocalforage('DicEnum');
  if (!DicEnum) {
    try {
      const { data } = await queryAll({});
      setDataInLocalforage('DicEnum', data);
    } catch (error) {}
  }
};

// 根据身份证返回生日性别

export const getInfoWithIdCard = (idcard: string) => {
  const birthday = `${idcard.substring(6, 10)}-${idcard.substring(
    10,
    12,
  )}-${idcard.substring(12, 14)}`;
  const gender =
    ((idcard.substr(16, 1) as unknown) as number) % 2 === 1 ? 3 : 4;
  return {
    birthday,
    gender,
  };
};
