import React, { FormEvent, useState } from 'react';
import { Button } from 'antd-mobile';
import classNames from 'classnames/bind';

import noConentImg from '@public/exception-noconent.png';
import noNetImg from '@public/exception-nonet.png';
import styles from './index.less';

enum ExceptionType {
  noConent = 1, // 无内容
  noNet = 2, // 当前网络无连接
  netError = 3, // 内容加载失败，检查网络
}

interface ExceptionProps {
  type?: ExceptionType;
  onClick?: (event: FormEvent<HTMLDivElement>) => void;
  className?: string;
  errRefresh?: (fn: Function) => any;
  errReload?: (fn: Function) => any;
}

const cx = classNames.bind(styles);

const Exception: React.FunctionComponent<ExceptionProps> = ({
  type = 1,
  onClick,
  className,
  errRefresh,
  errReload,
}) => {
  const [loading, setLoading] = useState(false);

  const innerErrRefresh = () => {
    setLoading(true);
    if (errRefresh) {
      errRefresh(() => {
        setLoading(false);
      });
    }
  };

  const innerErrReload = () => {
    setLoading(true);
    if (errReload) {
      errReload(() => {
        setLoading(false);
      });
    }
  };

  const noConent = (
    <>
      <img className={cx('show-img')} src={noConentImg} alt="无内容" />
      <div className={cx('no-content-tip', 'tip')}>当前列表无内容</div>
    </>
  );
  const noNet = (
    <>
      <img className={cx('show-img')} src={noNetImg} alt="无网络" />
      <div className={cx('no-net-tip', 'tip')}>当前无网络连接</div>
      <Button
        type="ghost"
        size="small"
        loading={loading}
        onClick={innerErrRefresh}
      >
        点击刷新
      </Button>
    </>
  );
  const netError = (
    <>
      <img className={cx('show-img')} src={noNetImg} alt="无网络" />
      <div className={cx('no-net-tip', 'tip')}>内容加载失败，请检查网络</div>
      <Button
        type="ghost"
        size="small"
        loading={loading}
        onClick={innerErrReload}
      >
        重新加载
      </Button>
    </>
  );

  const contentMap = new Map([
    [1, noConent],
    [2, noNet],
    [3, netError],
  ]);

  return (
    <div className={cx('exception', className)} onClick={onClick}>
      <div className={cx('dom-wrap')}>{contentMap.get(type)}</div>
    </div>
  );
};

export default Exception;
