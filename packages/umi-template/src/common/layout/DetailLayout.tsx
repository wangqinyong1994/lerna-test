import React from 'react';
import classnames from 'classnames/bind';

import styles from './DetailLayout.less';

const cx = classnames.bind(styles);

interface DetailLayoutProps {
  classNames?: string;
}

interface DetailCardLayoutProps {
  title?: string | React.ReactElement;
  content?: string | React.ReactElement;
}

export const DetailLayout: React.FunctionComponent<DetailLayoutProps> = ({
  children,
  classNames,
}) => <div className={cx('detail-layout', classNames)}>{children}</div>;

export const DetailCardLayout: React.FunctionComponent<DetailCardLayoutProps> = ({
  title,
  content,
}) => (
  <div className={cx('detail-layout-item')}>
    <div className={cx('detail-layout-item-title')}>{title}</div>
    <div className={cx('detail-layout-item-content')}>{content}</div>
  </div>
);
