import React from 'react';
import classnames from 'classnames/bind';
import { ImagePicker, Toast } from 'antd-mobile';
import { formShape } from 'rc-form';
import FormField from '@/components/FormField';
import TQPrism from '@/utils/TQPrism';
import { uploadAllFile } from '@/utils';
import envConfig from '@/env.config';
import styles from './index.less';

const { ossUrl, prefix } = envConfig.ossConfig as any;

const cx = classnames.bind(styles);

interface FormImagePickerProps {
  form: formShape;
  title?: string;
  limit?: number;
  itemName?: string;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({
  form,
  title,
  limit = 8,
  itemName = 'files',
}) => {
  const { getFieldProps, getFieldValue, setFieldsValue } = form;
  const imagePickerChange = async (files) => {
    try {
      let _files = files.slice();
      if (files.length >= limit) {
        if (files.length > limit) {
          Toast.info(`最多上传${limit}张图片`);
        }
        _files = files.slice(0, limit);
      }
      const _res = (await uploadAllFile(_files)) as any;
      const res = _res.map((item, index) =>
        Object.assign(item, files[index], {
          ossKey: `${ossUrl}${prefix}${item.taskcenterUrl}`,
        }),
      );
      setFieldsValue({
        [itemName]: res,
      });
    } catch (error) {}
  };

  const imagePickerChangeClick = (index, files) => {
    const urls = [files[index].ossKey];
    TQPrism.previewImage({
      urls,
    });
  };
  return (
    <FormField
      extraItem={
        <div className={cx('remark-item')}>
          <div className={cx('remark-title')}>{title || '附件'}</div>
          <div className={styles.remark}>
            <ImagePicker
              {...getFieldProps(itemName, {
                valuePropName: 'files',
              })}
              onChange={imagePickerChange}
              onImageClick={imagePickerChangeClick}
              selectable={
                limit >
                ((getFieldValue(itemName) && getFieldValue(itemName).length) ||
                  0)
              }
              multiple
            />
          </div>
        </div>
      }
    />
  );
};

export default FormImagePicker;
