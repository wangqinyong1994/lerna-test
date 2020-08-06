import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { formShape } from 'rc-form';
import FormField from '@/components/FormField';
import AreaPicker from '@/components/AreaPicker';

import styles from './index.less';

const cx = classnames.bind(styles);

interface AreaPickerItemProps {
  form: formShape;
  title?: string;
  itemName: string;
  limit?: number;
  required?: boolean;
}

const AreaPickerItem: React.FC<AreaPickerItemProps> = ({
  form,
  title,
  itemName,
  limit = 3,
  required = false,
}) => {
  const [areaPickerVisible, setAreaPickerVisible] = useState(false);
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
    getFieldError,
  } = form;

  const areaPickerChooseHandler = (val: any[]) => {
    let orgNameStr = '';
    let idStr = '';
    let orgCodeStr = '';
    const retArr = val.map((arr) => arr.filter((item) => item.checked)).flat();
    retArr.forEach((item) => {
      orgNameStr += `${item.orgName};`;
      idStr += `${item.id};`;
      orgCodeStr += `${item.orgCode};`;
    });
    setFieldsValue({
      [itemName]: {
        orgNameStr: orgNameStr.slice(0, -1),
        idStr: idStr.slice(0, -1),
        orgCodeStr: orgCodeStr.slice(0, -1),
      },
    });
  };

  const renderPlaceValue = (value) => {
    if (value) {
      const { orgNameStr } = value;
      return orgNameStr ? orgNameStr.replaceAll(';', '-') : null;
    }
    return null;
  };

  const areaPickerClose = () => {
    setAreaPickerVisible(false);
  };

  return (
    <>
      <FormField
        label={title}
        labelRequired={required}
        content={getFieldDecorator(itemName, {
          rules: [{ required, message: `请输入${title}` }],
        })(
          <div
            className={cx('text-dom')}
            onClick={() => setAreaPickerVisible(true)}
          >
            {renderPlaceValue(getFieldValue(itemName)) || `请选择${title}`}
          </div>,
        )}
        fieldError={getFieldError(itemName)}
      />
      <AreaPicker
        limit={limit}
        visible={areaPickerVisible}
        onChooseHandler={areaPickerChooseHandler}
        onModalClose={areaPickerClose}
      />
    </>
  );
};

export default AreaPickerItem;
