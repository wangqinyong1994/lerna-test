/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Todo 人员多选
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames/bind';
import { SearchBar, Button, Modal } from 'antd-mobile';
import { CheckBox } from '@/components/CheckBox';

import IconFemale from '@public/icon_female.png';
import IconMale from '@public/icon_male.png';

import styles from './index.less';

const cx = classNames.bind(styles);

interface ChooseMemberProps {
  visible: boolean;
  triggerVisible: Function;
}

const CheckboxItem = ({ name, id, checkHandler }) => {
  const [checked, setChecked] = useState(false);
  const checkBoxHandler = (value, id) => {
    checkHandler({
      value,
      id,
    });
    setChecked(!checked);
  };

  return (
    <div className={cx('checkbox-item', { checked })}>
      <label className={styles.label} htmlFor={`box${id}`}>
        <div className={cx('checkbox-left')} id={`box${id}`}>
          <CheckBox onChange={(value) => checkBoxHandler(value, id)} />
        </div>
        <div className={cx('checkbox-right')}>
          <div className={styles.title}>
            <span>{name}</span>
            <img src={IconFemale} alt="IconFemale" />
          </div>
          <div className={styles.content}>
            <div>
              岗位：<span>调解人员</span>
            </div>
            <div>
              职务：<span>书记</span>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

const ChooseMember: React.FunctionComponent<ChooseMemberProps> = ({
  visible,
  triggerVisible,
}) => {
  const [json, setJson] = useState([
    {
      id: 1,
      name: '魏琦莺1',
    },
    {
      id: 2,
      name: '魏琦莺2',
    },
    {
      id: 3,
      name: '魏琦莺3',
    },
    {
      id: 4,
      name: '魏琦莺4',
    },
    {
      id: 5,
      name: '魏琦莺5',
    },
    {
      id: 6,
      name: '魏琦莺6',
    },
    {
      id: 7,
      name: '魏琦莺7',
    },
    {
      id: 8,
      name: '魏琦莺8',
    },
    {
      id: 9,
      name: '魏琦莺9',
    },
    {
      id: 10,
      name: '魏琦莺10',
    },
  ]);
  const [checkedArr, setCheckedArr] = useState<{}[]>([]);
  const checkBoxItemRef = useRef<any>();

  const confirm = () => {
    console.log(70, checkedArr);
  };

  const onClose = () => {
    triggerVisible();
  };

  const checkHandler = ({ value, id }) => {
    const _checkedArr = checkedArr.slice();
    const innerTargetIndex = _checkedArr.findIndex(
      (item: { [key: string]: any }) => item.id === id,
    );
    if (innerTargetIndex > -1) {
      _checkedArr.splice(innerTargetIndex, 1);
    } else {
      _checkedArr.push({ value, id });
    }
    setCheckedArr(_checkedArr);
  };

  return (
    <Modal
      title="添加人员"
      visible={visible}
      popup
      closable
      onClose={onClose}
      animationType="slide-up"
      wrapClassName={cx('modal-wrap')}
    >
      <div className={cx('choose-member-wrap')}>
        <div className={cx('search-bar')}>
          <SearchBar placeholder="人员姓名/身份证号" maxLength={8} />
        </div>
        <div className={cx('checkbox-wrap')} ref={checkBoxItemRef}>
          {json.map(({ id, name }) => (
            <CheckboxItem
              checkHandler={checkHandler}
              id={id}
              key={id}
              name={name}
            />
          ))}
        </div>
        <div className={cx('footer-wrap')}>
          <div className={styles.footer}>
            <div className={cx('footer-left')}>
              <span>已选： {checkedArr.length}个</span>
            </div>
            <div className={cx('footer-right')}>
              <Button
                type="primary"
                style={{ width: 250, height: 88, backgroundColor: '#4A7EFE' }}
                onClick={confirm}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChooseMember;
