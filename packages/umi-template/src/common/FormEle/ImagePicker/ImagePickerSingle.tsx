/* eslint-disable func-names */
import React, { useCallback } from 'react';
import classnames from 'classnames/bind';
import { formShape } from 'rc-form';
import TQPrism from '@/utils/TQPrism';
import { uploadAllFile } from '@/utils';
import envConfig from '@/env.config';

import IconFormJt from '@public/icon-form-jt.png';
import IconMaleAva from '@public/icon_male_avatar.png';
import styles from './index.less';

const { ossUrl, prefix } = envConfig.ossConfig as any;

const cx = classnames.bind(styles);

interface FormImagePickerSingleProps {
  form: formShape;
  title?: string;
  itemName: string;
}

const FormImagePickerSingle: React.FC<FormImagePickerSingleProps> = ({
  form,
  title = '上传头像',
  itemName,
}) => {
  const { getFieldProps, getFieldValue, setFieldsValue } = form;

  const imagePickerChange = useCallback(async (files) => {
    try {
      const _res = (await uploadAllFile(files)) as any;
      const res = _res.map((item, index) =>
        Object.assign(item, files[index], {
          ossKey: `${ossUrl}${prefix}${item.taskcenterUrl}`,
        }),
      );
      setFieldsValue({
        [itemName]: [res[0].ossKey],
      });
    } catch (error) {}
  }, []);

  const uploadFile = async () => {
    try {
      const res = await TQPrism.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        count: 1,
      });
      const _tempFiles = res.tempFiles.map((item) => ({
        ...item,
        file: {
          name: item.name,
        },
      }));
      const path = _tempFiles[0].path;
      const response = await fetch(path);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        _tempFiles[0].url = reader.result;
        imagePickerChange(_tempFiles);
      };
    } catch (error) {}
  };

  const imagePickerChangeClick = () => {
    const file = getFieldValue(itemName);
    if (file) {
      TQPrism.previewImage({
        urls: [file],
      });
    }
  };
  return (
    <div className={cx('avatar-wrap')}>
      <div className={cx('avatar-item')}>
        <img
          className={styles.avatar}
          alt="itemName"
          {...getFieldProps(itemName, {
            valuePropName: 'src',
            initialValue: IconMaleAva,
            normalize: (value) => {
              if (!value) {
                return IconMaleAva;
              }
              return Array.isArray(value) ? value[0] : value;
            },
          })}
          onClick={imagePickerChangeClick}
        />
        <div className={cx('avatar-item-right')} onClick={uploadFile}>
          <span>{title}</span>
          <img className={styles.icon} src={IconFormJt} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default FormImagePickerSingle;
