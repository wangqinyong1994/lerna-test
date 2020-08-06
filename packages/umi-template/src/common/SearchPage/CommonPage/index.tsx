import React from 'react';
import classnames from 'classnames/bind';
import { NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

const cx = classnames.bind(styles);

interface SearchPageProps {
  visible: boolean;
  triggerVisible: Function;
  title: string;
}

const SearchPage: React.FC<SearchPageProps> = ({
  visible,
  triggerVisible,
  title,
  children,
}) => {
  const onLeftClick = () => {
    triggerVisible && triggerVisible();
  };

  return (
    <div className={cx('search-page', { active: visible })}>
      <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={onLeftClick}>
        {title}
      </NavBar>
      <div className={cx('search-page-container')}>{children}</div>
    </div>
  );
};

export default SearchPage;
