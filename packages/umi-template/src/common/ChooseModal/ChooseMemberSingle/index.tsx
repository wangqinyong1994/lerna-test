/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import { SearchBar, Button, Modal, ActivityIndicator } from 'antd-mobile';
import debounce from 'lodash/debounce';
import { Noop } from 'umi';
import { getOrgCode, getUrlParam } from '@/utils';
import { baseInfoFindSimpleList } from '@/services';

import IconFemale from '@public/icon_female.png';
import IconMale from '@public/icon_male.png';
import IconRadioChecked from '@public/icon_radio_checked.png';
import IconRadioUnChecked from '@public/icon_radio_unchecked.png';

import styles from './index.less';

const cx = classNames.bind(styles);

interface ChooseMemberSingleProps {
  visible: boolean;
  triggerVisible: Function;
  confirmHandler?: (...args) => void;
}

const CheckboxItem = (props) => {
  const {
    checked,
    name,
    id,
    idcardno,
    gender,
    checkHandler,
    populationType,
  } = props;

  const radioClick = ({ checked, name, id }) => {
    checkHandler({
      checked,
      name,
      id,
    });
  };

  return (
    <div className={cx('checkbox-item', { checked })}>
      <label
        className={styles.label}
        htmlFor={`box${id}`}
        onClick={() => radioClick({ checked, name, id })}
      >
        <div className={cx('checkbox-left')} id={`box${id}`}>
          <img
            src={checked ? IconRadioChecked : IconRadioUnChecked}
            alt="radio"
          />
        </div>
        <div className={cx('checkbox-right')}>
          <div className={styles.title}>
            <span>{name}</span>
            <img src={gender === 3 ? IconMale : IconFemale} alt="sex" />
          </div>
          <div className={styles.content}>
            {populationType === '0' ? '身份证号' : '证件号'}：
            <span>{idcardno}</span>
          </div>
        </div>
      </label>
    </div>
  );
};

const ChooseMemberSingle: React.FunctionComponent<ChooseMemberSingleProps> = forwardRef(
  ({ visible, triggerVisible, confirmHandler }, ref) => {
    const [json, setJson] = useState<Noop[]>([]);
    const [loading, setLoading] = useState(false);
    const populationType = getUrlParam('populationType');

    const onClose = () => {
      triggerVisible();
      setJson([]);
    };

    const confirm = () => {
      const ret = json.filter((item) => item.checked)[0];
      if (ret) {
        confirmHandler && confirmHandler(ret);
        setJson([]);
      }
      onClose();
    };

    const checkHandler = ({ checked, name, id }) => {
      const _json = json.slice().map((item) => ({
        ...item,
        checked: id === item.id,
      }));
      setJson(_json);
    };

    const onSearch = debounce(async (val: string) => {
      if (!val) {
        setJson([]);
        return;
      }
      try {
        setLoading(true);
        const params = {
          orgCode: getOrgCode(),
          keyword: val,
          populationType: populationType || 0,
        };
        const {
          data: { data },
        } = await baseInfoFindSimpleList(params);
        const json = data.map((item) => ({ ...item, checked: false }));
        setJson(json);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }, 500);

    return (
      <Modal
        title="选择人员"
        visible={visible}
        popup
        closable
        onClose={onClose}
        animationType="slide-up"
        wrapClassName={cx('modal-wrap')}
      >
        <div className={cx('choose-member-single-wrap')}>
          <div className={cx('search-bar')}>
            <SearchBar
              onChange={onSearch}
              placeholder="人员姓名/身份证号/联系手机"
              maxLength={8}
            />
          </div>
          <div className={cx('checkbox-wrap')}>
            {loading ? (
              <ActivityIndicator animating toast text="加载中..." />
            ) : (
              <>
                {json.map((item) => (
                  <CheckboxItem
                    key={item.id}
                    populationType={populationType}
                    {...item}
                    checkHandler={checkHandler}
                  />
                ))}
              </>
            )}
          </div>
          <div className={cx('footer-wrap')}>
            <div className={styles.footer}>
              <div className={cx('footer-right')}>
                <Button
                  type="primary"
                  style={{ backgroundColor: '#4A7EFE' }}
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
  },
);

export default ChooseMemberSingle;
