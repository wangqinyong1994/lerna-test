import React, { ReactElement, FormEvent } from 'react';
import classNames from 'classnames/bind';
import IconFormJt from '@public/icon-form-jt.png';

import styles from './index.less';

interface FormFieldProps {
  labelRequired?: boolean;
  label?: string;
  controlClassName?: string;
  extraItem?: ReactElement;
  labelImg?: ReactElement | null;
  className?: string;
  content?: any;
  onClick?: (event: FormEvent<HTMLDivElement>) => void;
  fieldError?: any;
}

const cx = classNames.bind(styles);

const FormField: React.FunctionComponent<FormFieldProps> = ({
  labelRequired,
  label,
  extraItem,
  labelImg,
  controlClassName,
  className,
  content,
  onClick,
  fieldError,
}) => {
  const isColorGrew =
    typeof content === 'string' &&
    (content.indexOf('输入') > -1 || content.indexOf('选择') > -1);
  return (
    <div className={cx('formField', className)} onClick={onClick}>
      {extraItem || (
        <div
          className={cx('control', controlClassName)}
          style={{ paddingBottom: content ? '0' : '32px' }}
        >
          <div className={cx('header')}>
            <div className={cx('label', { labelRequired })}>{label}</div>
            {labelImg === null
              ? null
              : labelImg || <img src={IconFormJt} alt="IconFormJt" />}
          </div>
          <div className={cx('content', { grew: isColorGrew })}>
            <div className={cx('text-dom')}>{content}</div>
          </div>
          {fieldError && fieldError.length > 0 ? (
            <div className={cx('error')}>{fieldError.join(',')}</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FormField;
