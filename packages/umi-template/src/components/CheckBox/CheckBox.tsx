import React, {
  ReactElement,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames/bind';
import IconUnChecked from '@public/icon-box-checked.png';

import styles from './index.less';

interface CheckBoxProps {
  className?: string;
  onChange?: (flag: boolean) => void;
}

const cx = classNames.bind(styles);

const CheckBox: React.FunctionComponent<CheckBoxProps> = forwardRef(
  ({ className, onChange }, ref) => {
    const [value, setValue] = useState(false);
    useImperativeHandle(ref, () => ({
      checked: !value,
    }));
    const unCheckedDom: ReactElement = <div className={styles.unChecked}></div>;
    const checkedDom: ReactElement = (
      <img
        className={styles.IconUnChecked}
        src={IconUnChecked}
        alt="IconUnChecked"
      />
    );

    const changeHandler = () => {
      setValue(!value);
      if (onChange) {
        onChange(value);
      }
    };

    return (
      <div
        className={cx('checkbox', className)}
        onClick={changeHandler}
        ref={ref}
      >
        {value ? checkedDom : unCheckedDom}
      </div>
    );
  },
);

export default CheckBox;
