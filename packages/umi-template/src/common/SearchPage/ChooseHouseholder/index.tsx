import React, { useState } from 'react';
import { SearchBar, ActivityIndicator, Toast } from 'antd-mobile';
import classnames from 'classnames/bind';
import debounce from 'lodash/debounce';
import { Noop, history } from 'umi';
import { registerHousePeople, baseInfoFindSimpleList } from '@/services';
import { getUrlParam, getOrgCode } from '@/utils';

import iconMale from '@public/icon_male.png';
import iconFemale from '@public/icon_female.png';

import styles from './index.less';

const cx = classnames.bind(styles);

interface ChooseHouseholderProps {}

const ChooseHouseholder: React.FC<ChooseHouseholderProps> = () => {
  const [list, setList] = useState<Noop[]>([]);
  const [isLoading, setLoading] = useState(false);
  const houseInfoId = getUrlParam('id');
  const populationType = getUrlParam('populationType');

  const onChange = debounce(async (val) => {
    try {
      if (val) {
        setLoading(true);
        const params = {
          orgCode: getOrgCode(),
          keyword: val,
          populationType,
        };
        const {
          data: { data },
        } = await baseInfoFindSimpleList(params);
        setList(data);
      } else {
        setList([]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, 500);

  const addMember = async (item: Noop) => {
    const { id } = item;
    try {
      const { success } = await registerHousePeople({
        baseRelId: id,
        houseInfoId,
        populationType,
      });
      if (success) {
        Toast.success('操作成功');
        setTimeout(() => {
          history.goBack();
        }, 1500);
      }
    } catch (error) {}
  };

  const renderName = (item) => {
    const { name, idcardno, gender, populationType } = item;
    return (
      <>
        <div className={styles.line1}>
          <span>{name}</span>
          <img src={gender !== 3 ? iconFemale : iconMale} alt="iconMale" />
        </div>
        <div className={styles.line2}>
          {populationType === 0 ? '身份证号' : '证件号码'}: {idcardno}
        </div>
      </>
    );
  };

  const renderList = () => {
    if (list && list.length > 0) {
      return list.map((item: Noop) => (
        <div key={item.id} className={styles.card}>
          <div className={cx('line-left')}>{renderName(item)}</div>
          <div className={cx('line-right')}>
            <span onClick={() => addMember(item)}>添加</span>
          </div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className={cx('choose-householder-wrap')}>
      <div className={cx('search-wrap')}>
        <SearchBar onChange={onChange} placeholder="姓名/身份证/联系手机" />
      </div>
      <div className={cx('search-container')}>
        {isLoading ? (
          <ActivityIndicator toast text="加载中..." animating />
        ) : (
          renderList()
        )}
      </div>
    </div>
  );
};

export default ChooseHouseholder;
