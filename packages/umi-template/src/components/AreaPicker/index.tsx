/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { Modal, Tabs, ActivityIndicator } from 'antd-mobile';
import classnames from 'classnames/bind';
import { orgManageViewChildren } from '@/services';

import IconTick from '@public/icon_tick.png';

import styles from './index.less';

const cx = classnames.bind(styles);

interface AreaPickerProps {
  visible?: boolean;
  onModalClose?: Function;
  onChooseHandler?: Function;
  limit?: number;
}

const stepMap = new Map([
  [-1, '省'],
  [0, '市'],
  [1, '区'],
  [2, '街道'],
  [3, '社区'],
  [4, '网格'],
]);

// Todo 回填

// 省市区街道

const AreaPicker: React.FunctionComponent<AreaPickerProps> = forwardRef(
  ({ visible = false, onModalClose, onChooseHandler, limit = 5 }, ref) => {
    // const [v, setV] = useState(visible);
    const [tabs, setTabs] = useState<any[]>([]);
    const [panes, setPanes] = useState<any[]>([]);
    const [allPanes, setAllPanes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(-1);

    const formatTitle = (val, len) => {
      if (val.length > len) {
        return `${val.slice(0, len)}...`;
      }
      return val;
    };

    const _orgManageViewChildren = async (params) => {
      try {
        setLoading(true);
        const {
          data: { field },
        } = await orgManageViewChildren(params);
        const _field = field.map((item) => ({
          ...item,
          title: item.orgName,
        }));
        const _tabs = tabs.slice();
        const _allPanes = allPanes.slice();
        if (step > -1) {
          const title = formatTitle(
            panes.find((item: any) => item.checked).title,
            4,
          );
          _tabs.splice(step, 1, { title });
        }
        _tabs.push({ title: `选择${stepMap.get(step)}` });
        _allPanes.push(_field);
        setStep(step + 1);
        setTabs(_tabs);
        setAllPanes(_allPanes);
        setPanes(_field);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      _orgManageViewChildren({ parentId: 1 });
    }, []);
    const onClose = () => {
      onModalClose && onModalClose();
    };
    const choosePlace = (tab: any) => {
      const _panes: any[] = panes.slice();
      _panes.forEach((item: any) => {
        if (item.orgName === tab.title) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      if (!tab.hasChildren || step >= limit) {
        const _tabs = tabs.slice();
        // Toast.fail('无下一级可选');
        _tabs[_tabs.length - 1].title = formatTitle(tab.orgName, 4);
        setTabs(_tabs);
        setPanes(_panes);
        return;
      }
      _orgManageViewChildren({ parentId: tab.id });
    };

    const onTabClickHandler = (tab, index) => {
      const _allPanes = allPanes.slice();
      setStep(index);
      setTabs(tabs.slice(0, index + 1));
      setPanes(_allPanes[index]);
      setAllPanes(_allPanes.slice(0, index + 1 || 1));
    };

    const confirm = () => {
      if (onChooseHandler) {
        onChooseHandler(allPanes);
        onClose();
      }
    };

    const renderContent = (tab, key) => (
      <div className={styles.content} key={key}>
        <div className={cx('content-title')}>{stepMap.get(step - 1)}</div>
        {loading ? (
          <ActivityIndicator text="Loading..." />
        ) : (
          panes &&
          panes.length > 0 &&
          panes.map((item: any) => (
            <div
              key={item.id}
              className={cx('content-item', { active: item.checked })}
              onClick={() => choosePlace(item)}
            >
              <span>{item.orgName}</span>
              {item.checked && <img src={IconTick} alt="IconTick" />}
            </div>
          ))
        )}
      </div>
    );

    return (
      <span className={styles.picker}>
        <Modal
          popup
          visible={visible}
          onClose={onClose}
          animationType="slide-up"
        >
          <div className={cx('modal-title')}>
            <span className={styles.tool} onClick={onClose}>
              取消
            </span>
            <span className={styles.name}>选择{stepMap.get(step - 1)}</span>
            <span className={styles.tool} onClick={confirm}>
              确认
            </span>
          </div>
          <Tabs
            tabs={tabs}
            renderTabBar={(props) => (
              <Tabs.DefaultTabBar {...props} activeTab={step} />
            )}
            onTabClick={onTabClickHandler}
          >
            {renderContent}
          </Tabs>
        </Modal>
      </span>
    );
  },
);

export default AreaPicker;
