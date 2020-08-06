import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { Modal } from 'antd-mobile';
import FormField from '@/components/FormField';
import classnames from 'classnames/bind';
import { formShape } from 'rc-form';

import IconTick from '@public/icon_tick.png';

import styles from './index.less';

const cx = classnames.bind(styles);

interface MultyFormModalProps {
  label: string;
  labelRequired?: boolean;
  async?: boolean;
  tips?: string;
  form: formShape;
  initPanes: any[] | Promise<any>;
  confirmHandler?: (...args) => void;
  itemName: string;
}

const MultyFormModal = forwardRef(
  (
    {
      label,
      labelRequired = false,
      async = false,
      tips = '',
      form,
      confirmHandler,
      initPanes = [],
      itemName,
    }: MultyFormModalProps,
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [panes, setPanes] = useState<any[]>(
      JSON.parse(JSON.stringify(initPanes)),
    );
    const [savedPanes, setSavedPanes] = useState<any[]>(
      JSON.parse(JSON.stringify(initPanes)),
    );
    useImperativeHandle(ref, () => ({
      panes: savedPanes.filter((item) => item.checked),
    }));

    const {
      getFieldDecorator,
      getFieldError,
      setFieldsValue,
      getFieldValue,
    } = form;
    const getInitValue = async () => {
      if (!async) {
        const res = await initPanes;
        setPanes(JSON.parse(JSON.stringify(res)));
        setSavedPanes(JSON.parse(JSON.stringify(res)));
      } else {
        const _res = await initPanes;
        const res = _res.map((item) => ({
          id: item.id,
          name: item.displayname,
          checked: item.checked || false,
        }));
        setPanes(JSON.parse(JSON.stringify(res)));
        setSavedPanes(JSON.parse(JSON.stringify(res)));
      }
    };

    useEffect(() => {
      getInitValue();
    }, []);
    const choosePlace = (item) => {
      const _panes = panes.slice().map((paneItem) => {
        if (paneItem.id === item.id) {
          paneItem.checked = !item.checked;
        }
        return paneItem;
      });
      setPanes(_panes);
    };

    const confirm = () => {
      if (confirmHandler) {
        confirmHandler(panes.filter((item) => item.checked));
      }
      setFieldsValue({
        [itemName]: panes,
      });
      setSavedPanes(JSON.parse(JSON.stringify(panes)));
      setVisible(false);
    };

    const cancel = () => {
      setVisible(false);
      setPanes(JSON.parse(JSON.stringify(savedPanes)));
    };

    const renderMultyText = () => {
      let arr = panes && panes.length && panes.filter((item) => item.checked);
      if (getFieldValue(itemName) && getFieldValue(itemName).length) {
        arr = getFieldValue(itemName).filter((item) => item.checked);
      }
      let ret = '';
      if (arr && arr.length) {
        arr.forEach((item) => {
          ret += `${item.name};`;
        });
        return ret;
      }
      return null;
    };

    return (
      <>
        <FormField
          label={label}
          labelRequired={labelRequired}
          content={getFieldDecorator(itemName, {
            rules: [
              { required: labelRequired, message: tips || `请选择${label}` },
            ],
            initialValue: undefined,
          })(
            <div
              className={cx('text-dom')}
              onClick={() => {
                getFieldValue(itemName) &&
                  setPanes(JSON.parse(JSON.stringify(getFieldValue(itemName))));
                getFieldValue(itemName) &&
                  setSavedPanes(
                    JSON.parse(JSON.stringify(getFieldValue(itemName))),
                  );
                setVisible(true);
              }}
            >
              {renderMultyText() || tips || `请选择${label}`}
            </div>,
          )}
          fieldError={getFieldError(itemName)}
        />
        <Modal
          wrapClassName={cx('multy-modal-wrap')}
          popup
          visible={visible}
          onClose={cancel}
          animationType="slide-up"
          title={
            <div className={styles.title}>
              <div className={cx('title-left')} onClick={cancel}>
                取消
              </div>
              <div className={cx('title-content')}>{label}</div>
              <div className={cx('title-right')} onClick={confirm}>
                确认
              </div>
            </div>
          }
        >
          {panes &&
            panes.length > 0 &&
            panes.map((item: any) => (
              <div
                key={item.id}
                className={cx('content-item', { active: item.checked })}
                onClick={() => choosePlace(item)}
              >
                <span>{item.name}</span>
                {item.checked && <img src={IconTick} alt="IconTick" />}
              </div>
            ))}
        </Modal>
      </>
    );
  },
);

export default MultyFormModal;
