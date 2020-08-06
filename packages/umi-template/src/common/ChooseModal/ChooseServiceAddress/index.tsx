import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import debounce from 'lodash/debounce';
import { findAddressKeyword } from '@/services';
import { getOrgCode } from '@/utils';
import TQSwitch from '@/components/Switch';
import FormField from '@/components/FormField';

import styles from './index.less';

const cx = classnames.bind(styles);

interface ListItem {
  id: number;
  ifUsed: boolean;
  fullAddress: string;
  [key: string]: any;
}

const ChooseServiceAddress: React.FunctionComponent = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [markText, setMarkText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const onChange = debounce(async (val) => {
    try {
      if (val) {
        setLoading(true);
        const { data } = await findAddressKeyword({
          orgCode: getOrgCode(),
          keyword: val,
        });
        setList(data);
        setMarkText(val);
      } else {
        setList([]);
        setMarkText('');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, 500);

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator toast text="加载中..." animating />;
    }
    if (list && list.length > 0) {
      return list.map((item: ListItem) => (
        <FormField
          extraItem={
            <div className={cx('card-wrap')}>
              <div className={styles.line1}>{item.fullAddress}</div>
              <div className={styles.line2}>
                <span>服务地址</span>
                <TQSwitch checked={item.ifUsed} />
              </div>
            </div>
          }
        />
      ));
    }
    if (markText && !list.length) {
      return <div className={styles.loading}>无内容</div>;
    }
    return null;
  };

  return (
    <div className={cx('choose-service-address-wrap')}>
      <div className={cx('search-wrap')}>
        <SearchBar onChange={onChange} placeholder="服务地址" />
      </div>
      {renderList()}
    </div>
  );
};

export default ChooseServiceAddress;
