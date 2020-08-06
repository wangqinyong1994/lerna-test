import React, { useState, useCallback } from 'react';
import { SearchBar, ActivityIndicator, Modal } from 'antd-mobile';
import classnames from 'classnames/bind';
import debounce from 'lodash/debounce';
import { formShape } from 'rc-form';
import FormField from '@/components/FormField';

import { queryOccupationPage } from '@/services';

import styles from './index.less';

const cx = classnames.bind(styles);

interface ListItem {
  displayname: string;
  id: number;
  [key: string]: any;
}

interface ChooseWorkItemProps {
  form: formShape;
  itemName: string;
  title: string;
  required?: boolean;
}

const ChooseWorkItem: React.FunctionComponent<ChooseWorkItemProps> = ({
  form,
  itemName,
  title,
  required = false,
}) => {
  const [list, setList] = useState<ListItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [markText, setMarkText] = useState('');
  const [isLoading, setLoading] = useState(false);

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
        const {
          data: { data },
        } = await queryOccupationPage({ occupationKeyWords: val });
        setMarkText(val);
        setList(data);
      } else {
        setMarkText('');
        setList([]);
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

  const chooseWork = useCallback((item: ListItem) => {
    setFieldsValue({
      [itemName]: item,
    });
    setVisible(false);
    reset();
  }, []);

  const onClose = () => {
    setVisible(false);
    reset();
  };

  const renderName = (name) => (
    <>
      <span className={styles.mark}>{markText}</span>
      <span>{name.replace(markText, '')}</span>
    </>
  );

  const renderChooseModalText = (val) => {
    if (val) {
      return val.displayname;
    }
    return null;
  };

  const renderList = () => {
    if (list && list.length > 0) {
      return list.map((item: ListItem) => (
        <div key={item.id} className={styles.card}>
          <div className={cx('line-left')}>{renderName(item.displayname)}</div>
          <div className={cx('line-right')} onClick={() => chooseWork(item)}>
            选择
          </div>
        </div>
      ));
    }
    if (markText && !list.length) {
      return <div className={styles.loading}>无内容</div>;
    }
    return null;
  };

  return (
    <>
      <FormField
        label={title}
        labelRequired={required}
        content={getFieldDecorator(itemName, {
          rules: [{ required, message: `请选择${title}` }],
        })(
          <div
            className={cx('text-dom', {
              black: getFieldValue(itemName) && getFieldValue(itemName).name,
            })}
            onClick={() => {
              setVisible(true);
            }}
          >
            {renderChooseModalText(getFieldValue(itemName)) || `请选择${title}`}
          </div>,
        )}
        labelImg={null}
        fieldError={getFieldError(itemName)}
      />
      <Modal
        title="选择职业"
        visible={visible}
        popup
        closable
        onClose={onClose}
        animationType="slide-up"
        wrapClassName={cx('modal-wrap')}
      >
        <div className={cx('choose-work-wrap')}>
          <div className={cx('search-wrap')}>
            <SearchBar onChange={onChange} placeholder="选择职业" />
          </div>
          <div className={cx('search-container')}>
            {isLoading ? (
              <ActivityIndicator toast text="加载中..." animating />
            ) : (
              renderList()
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChooseWorkItem;
