import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { SearchBar, ActivityIndicator, Modal } from 'antd-mobile';
import debounce from 'lodash/debounce';
import { findAddressKeyword } from '@/services';
import FormField from '@/components/FormField';
import { getOrgCode } from '@/utils';

import styles from './index.less';

const cx = classnames.bind(styles);

interface ListItem {
  id: number;
  ifUsed: boolean;
  fullAddress: string;
  [key: string]: any;
}

interface ChooseAddressProps {
  visible: boolean;
  triggerVisible: Function;
}

const ChooseAddress: React.FC<ChooseAddressProps> = ({
  visible,
  triggerVisible,
}) => {
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

  const reset = () => {
    setList([]);
    setMarkText('');
    setLoading(false);
  };

  const chooseAddress = (item: ListItem) => {
    triggerVisible && triggerVisible(item);
    reset();
  };

  const onClose = () => {
    triggerVisible({});
    reset();
  };

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator toast text="加载中..." animating />;
    }
    if (list && list.length > 0) {
      return list.map((item: ListItem) => (
        <FormField
          key={item.id}
          extraItem={
            <div className={cx('card-wrap')}>
              <div className={styles.line1}>{item.fullAddress}</div>
              <div className={styles.line2} onClick={() => chooseAddress(item)}>
                选择
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
    <Modal
      title="选择地址"
      visible={visible}
      popup
      closable
      onClose={onClose}
      animationType="slide-up"
      wrapClassName={cx('modal-wrap')}
    >
      <div className={cx('choose-address-wrap')}>
        <div className={cx('search-wrap')}>
          <SearchBar onChange={onChange} placeholder="选择地址" />
        </div>
        {renderList()}
      </div>
    </Modal>
  );
};

export default ChooseAddress;
