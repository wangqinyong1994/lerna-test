import React, { useState, useCallback } from 'react';
import classnames from 'classnames/bind';
import { SearchBar, ActivityIndicator, Modal } from 'antd-mobile';
import { formShape } from 'rc-form';
import debounce from 'lodash/debounce';
import { findAddressKeyword, queryHouseAddressListByKeyword } from '@/services';
import { getOrgCode } from '@/utils';
import FormField from '@/components/FormField';

import styles from './index.less';

const cx = classnames.bind(styles);

interface ListItem {
  id: number;
  ifUsed: boolean;
  fullAddress: string;
  [key: string]: any;
}

interface ChooseAddressItemProps {
  form: formShape;
  label?: string;
  itemName?: string;
  required?: boolean;
  searchType?: 'normal' | 'house';
}

const ChooseAddressItem: React.FC<ChooseAddressItemProps> = ({
  form,
  label,
  itemName = 'address',
  required = false,
  searchType = 'normal',
}) => {
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<ListItem[]>([]);
  const [markText, setMarkText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const fetchNameObj = {
    normal: findAddressKeyword,
    house: queryHouseAddressListByKeyword,
  };
  const fetchName = fetchNameObj[searchType];
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
    getFieldError,
  } = form;
  const onChange = debounce(async (val) => {
    try {
      if (val) {
        setLoading(true);
        let data;
        const res = await fetchName({
          orgCode: getOrgCode(),
          keyword: val,
        });
        if (searchType === 'normal') {
          data = res.data;
        } else {
          data = res.data.data;
        }
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
    setVisible(false);
  };

  const chooseAddress = useCallback((item: ListItem) => {
    setFieldsValue({
      [itemName]: item,
    });
    reset();
  }, []);

  const onClose = () => {
    reset();
  };

  const renderChooseModalText = (val) => {
    if (val) {
      return val.fullAddress || val.currentAddress;
    }
    return null;
  };

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator toast text="加载中..." animating />;
    }
    if (list && list.length > 0) {
      return (
        <div className={cx('list-wrap')}>
          {list.map((item: ListItem) => (
            <FormField
              key={item.id}
              extraItem={
                <div className={cx('card-wrap')}>
                  <div className={styles.line1}>{item.fullAddress}</div>
                  <div
                    className={styles.line2}
                    onClick={() => chooseAddress(item)}
                  >
                    选择
                  </div>
                </div>
              }
            />
          ))}
        </div>
      );
    }
    if (markText && !list.length) {
      return <div className={styles.loading}>无内容</div>;
    }
    return null;
  };

  return (
    <>
      <FormField
        label={label}
        content={getFieldDecorator(itemName, {
          rules: [{ required, message: `请选择${label}` }],
        })(
          <span onClick={() => setVisible(true)}>
            {renderChooseModalText(getFieldValue(itemName)) || `请选择${label}`}
          </span>,
        )}
        labelImg={null}
        labelRequired={required}
        fieldError={getFieldError(itemName)}
      />
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
    </>
  );
};

export default ChooseAddressItem;
