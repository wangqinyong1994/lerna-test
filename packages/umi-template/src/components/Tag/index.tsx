import React from 'react';
import classnames from 'classnames/bind';
import IconBlackDelete from '@public/icon_black_delete.png';

import styles from './index.less';

const cx = classnames.bind(styles);

interface TagProps {
  checked?: boolean;
  title: string;
  value: string | number;
  touchHandler?: Function;
  closeHandler?: Function;
  tagClassName?: string;
  tagActClassName?: string;
  showCancel?: boolean;
}

const Tag: React.FunctionComponent<TagProps> = ({
  checked = false,
  showCancel = false,
  title,
  value,
  touchHandler,
  tagClassName,
  tagActClassName,
  closeHandler,
}) => {
  const onTouchEnd = (e) => {
    e.stopPropagation();
    if (touchHandler) {
      touchHandler({ title, id: value, checked });
    }
  };

  const onClose = (e) => {
    e.stopPropagation();
    if (closeHandler) {
      closeHandler({ title, id: value, checked });
    }
  };

  return (
    <div
      className={cx(
        'tag',
        { [tagActClassName || 'active']: checked },
        tagClassName,
      )}
      onTouchEnd={onTouchEnd}
    >
      {title}
      {showCancel && (
        <img
          className={cx('close-wrap')}
          onTouchEnd={onClose}
          src={IconBlackDelete}
          alt="IconBlackDelete"
        />
      )}
    </div>
  );
};

export default Tag;
