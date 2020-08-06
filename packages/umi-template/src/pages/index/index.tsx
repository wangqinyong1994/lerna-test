import React from 'react';
import classnames from 'classnames/bind';

import styles from './index.less';

const cx = classnames.bind(styles);

interface IndexProps {}

const Index: React.FC<IndexProps> = () => (
  <div className={cx('index-wrap')}>Index</div>
);

export default Index;
