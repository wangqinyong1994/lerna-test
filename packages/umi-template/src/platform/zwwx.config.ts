const { TQ_ENV } = process.env;
const isZwwxTest = TQ_ENV && TQ_ENV === 'zwwx_test';
const isZwwxProd = TQ_ENV && TQ_ENV === 'zwwx_prod';

// 政务微信-测试环境
const zwwxModulePopulationTest = {
  appSecret: 'c4c00b341271472b947cebd3b59d4ab7',
  apiSecret: 'fc98243719ce43648a427dcabc52a59f',
};

// 无线云平台-测试环境
const prismConfigTest = {
  appKey: 'a50dfdf905e646e0834da2ab6183c007', // 无线云平台分配的appKey
  apiUrl: 'http://wcpf.daliandong.cn/', // 无线云平台服务地址
  libPath: '/libs/tq-prism/',
};

// 政务微信-正式环境
const zwwxModulePopulationProd = {
  appSecret: '06cb8ab84541493a9901911e59615c1d',
  apiSecret: 'fb7911e6cf4046f784ead2858610d57e',
};

// 无线云平台-正式环境
const prismConfigProd = {
  appKey: 'bf5ee448a000464eaab0a9def4f47ab8', // 无线云平台分配的appKey
  apiUrl: 'http://wcpf.daliandong.cn/', // 无线云平台服务地址
  libPath: '/libs/tq-prism/',
};

export const getZwwxModuleConfig = () => {
  if (isZwwxTest) {
    return zwwxModulePopulationTest;
  }
  if (isZwwxProd) {
    return zwwxModulePopulationProd;
  }
  return zwwxModulePopulationTest;
};

export const getZwwxPrismConfig = () => {
  if (isZwwxTest) {
    return prismConfigTest;
  }
  if (isZwwxProd) {
    return prismConfigProd;
  }
  return prismConfigTest;
};
