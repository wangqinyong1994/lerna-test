import React, { ReactElement, FormEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

interface GroupProps {
  className?: string;
  children?: ReactElement | any[];
  onChange?: (event: FormEvent<HTMLDivElement>) => void;
}

const cx = classNames.bind(styles);

const Group: React.FunctionComponent<GroupProps> = ({
  className,
  children,
  onChange,
}) => (
  <div className={cx('group', className)} onClick={onChange}>
    {children}
  </div>
);

export default Group;
