/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from 'react';
import { history } from 'umi';
import Draggable from 'react-draggable';
import classnames from 'classnames/bind';
import { getPositionWithDevice } from '@/utils';

import IconFloatOrg from '@public/icon_float_org.png';

import styles from './index.less';

const cx = classnames.bind(styles);

interface AreaFloatBtnProps {
  defaultPosition: {
    x: number;
    y: number;
  };
}

const AreaFloatBtn: React.FC<AreaFloatBtnProps> = ({ defaultPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const positionObj = useMemo(
    () => ({
      x: getPositionWithDevice(defaultPosition.x),
      y: getPositionWithDevice(defaultPosition.y),
    }),
    [],
  );

  const onClick = (...args) => {
    history.push('/superviseOrg');
  };

  const onDrag = (...args) => {
    setIsDragging(true);
  };

  const onStop = (...args) => {
    if (isDragging) {
      onDrag(...args);
    } else {
      onClick(...args);
    }
    setIsDragging(false);
  };

  return (
    <div className={cx('float-btn-wrap')}>
      <Draggable onDrag={onDrag} onStop={onStop} defaultPosition={positionObj}>
        <img
          className={cx('float-btn')}
          src={IconFloatOrg}
          alt="IconFloatAdd"
        />
      </Draggable>
    </div>
  );
};

export default AreaFloatBtn;
