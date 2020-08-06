import React, { useEffect, useState, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavBar, Icon } from 'antd-mobile';
import { Helmet } from 'react-helmet';
import { history, useLocation } from 'umi';
import { initDicEnum } from '@/utils';
import styles from './BasicLayout.less';

const Fade = ({ children }) => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);
  }, []);
  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="screen-trans"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

interface BasicLayoutProps {
  title: string | undefined;
  children?: React.ReactChildren;
}

const BasicLayout: React.FunctionComponent<BasicLayoutProps> = ({
  children,
  title,
}) => {
  const location = useLocation();
  const isZWWX = useMemo(() => localStorage.getItem('ENV') === 'wechatZW', []);
  const navBack = () => {
    history.goBack();
  };
  useEffect(() => {
    initDicEnum();
    const token = localStorage.getItem('Authorization');
    if (!token) {
      history.replace('/login');
    }
  }, []);
  if (isZWWX) {
    return (
      <>
        <div className={styles.basicLayout}>
          <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={navBack}>
            {title}
          </NavBar>
          <div className={styles.container}>
            <Fade key={location.pathname}>{children}</Fade>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={styles.basicLayout}>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={navBack}>
          {title}
        </NavBar>
        <div className={styles.container}>
          <Fade key={location.pathname}>{children}</Fade>
        </div>
      </div>
    </>
  );
};

export default BasicLayout;
