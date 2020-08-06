import React from 'react';
import { Switch } from 'antd-mobile';
import { formShape } from 'rc-form';
import classnames from 'classnames/bind';

import styles from './index.less';

const cx = classnames.bind(styles);

interface SwitchItemProps {
  form: formShape;
  title?: string | React.ReactElement;
  itemName: string;
  checked?: boolean;
  onChangeHandler?: Function;
}

const SwitchItem: React.FC<SwitchItemProps> = ({
  form,
  title,
  itemName,
  checked = false,
  onChangeHandler,
}) => {
  const { getFieldProps, setFieldsValue } = form;
  return (
    <div className={cx('switch-item')}>
      <div className={cx('title')}>{title}</div>
      <Switch
        {...getFieldProps(itemName, {
          initialValue: checked,
          valuePropName: 'checked',
        })}
        color="#4A7EFE"
        onClick={(checked) => {
          if (onChangeHandler) {
            onChangeHandler(checked);
          }
          setFieldsValue({
            [itemName]: checked,
          });
        }}
      />
    </div>
  );
};

export default SwitchItem;
