import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Switch } from 'antd-mobile';

import styles from './index.less';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  color?: '#4A7EFE' | string;
  name?: string;
  platform?: 'ios' | 'android';
  onChangeHandler?: (checked) => void;
}

const TQSwitch: React.FunctionComponent<SwitchProps> = forwardRef(
  (
    {
      checked = false,
      disabled = false,
      color = '#4A7EFE',
      name,
      platform,
      onChangeHandler,
    },
    ref,
  ) => {
    const [switchChecked, setSwitchChecked] = useState(checked);
    useImperativeHandle(ref, () => ({
      checked: switchChecked,
    }));
    const onChange = (checked) => {
      if (onChangeHandler) {
        onChangeHandler(checked);
      }
      setSwitchChecked(checked);
    };

    return (
      <span className={styles.switch}>
        <Switch
          checked={switchChecked}
          disabled={disabled}
          name={name}
          platform={platform}
          color={color}
          onChange={onChange}
        />
      </span>
    );
  },
);

export default TQSwitch;
