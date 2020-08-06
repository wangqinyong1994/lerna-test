/* eslint-disable import/no-unresolved */
import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.less';

interface CardLayoutProps {
  className?: string;
  renderHeader?: React.ReactElement | null;
  renderContainer?: React.ReactElement | null;
  renderFooter?: React.ReactElement | null;
  clickHandler?: () => void;
}

const cx = classNames.bind(styles);

const CardLayout: React.FunctionComponent<CardLayoutProps> = ({
  className,
  renderHeader,
  renderContainer,
  renderFooter,
  clickHandler,
}) => (
  <div className={cx('card-layout-wrap', className)} onClick={clickHandler}>
    {renderHeader && <div className={styles.header}>{renderHeader}</div>}
    {renderContainer && (
      <div className={styles.container}>{renderContainer}</div>
    )}
    {renderFooter && <div className={styles.footer}>{renderFooter}</div>}
  </div>
);

export default CardLayout;
