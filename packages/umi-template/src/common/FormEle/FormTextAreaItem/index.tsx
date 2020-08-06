import React from 'react';
import { TextareaItem } from 'antd-mobile';
import { formShape } from 'rc-form';
import classnames from 'classnames/bind';
import FormField from '@/components/FormField';

import styles from './index.less';

const cx = classnames.bind(styles);

interface FormTextAreaProps {
  form: formShape;
  title?: string | React.ReactElement;
  itemName: string;
}

const FormTextAreaItem: React.FC<FormTextAreaProps> = ({
  form,
  title = '备注',
  itemName = 'remarks',
}) => {
  const { getFieldProps } = form;
  return (
    <FormField
      extraItem={
        <div className={cx('remark-item')}>
          <div className={cx('remark-title')}>{title}</div>
          <div className={styles.remark}>
            <TextareaItem
              placeholder={`请输入${title}`}
              {...getFieldProps(itemName, {})}
              rows={3}
            />
          </div>
        </div>
      }
    />
  );
};

export default FormTextAreaItem;
