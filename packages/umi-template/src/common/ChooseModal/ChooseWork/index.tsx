import React, { useState } from 'react';
import { SearchBar, ActivityIndicator, Modal } from 'antd-mobile';
import classnames from 'classnames/bind';
import debounce from 'lodash/debounce';
import { queryOccupationPage } from '@/services';

import styles from './index.less';

const cx = classnames.bind(styles);

interface ListItem {
  displayname: string;
  id: number;
  [key: string]: any;
}

interface ChooseWorkProps {
  visible: boolean;
  triggerVisible: Function;
}

const ChooseWork: React.FunctionComponent<ChooseWorkProps> = ({
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

  const chooseWork = (item: ListItem) => {
    triggerVisible && triggerVisible(item);
    reset();
  };

  const onClose = () => {
    triggerVisible({});
    reset();
  };

  const renderName = (name) => (
    <>
      <span className={styles.mark}>{markText}</span>
      <span>{name.replace(markText, '')}</span>
    </>
  );

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
  );
};

export default ChooseWork;
