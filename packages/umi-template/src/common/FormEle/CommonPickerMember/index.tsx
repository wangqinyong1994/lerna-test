import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classnames from 'classnames/bind';
import { Noop } from 'umi';
import { useDicEnum } from '@/utils/hooks';
import { formShape } from 'rc-form';
import { findBaseInfo, findOverseaPersonnelById } from '@/services';
import FormField from '@/components/FormField';
import ChooseMemberSingle from '@/common/ChooseModal/index.less/ChooseMemberSingle';
import { getUrlParam } from '@/utils';

import IconMale from '@public/icon_male.png';
import IconFemale from '@public/icon_female.png';
import styles from './index.less';

const cx = classnames.bind(styles);

interface CommonPickerMemberProps {
  form: formShape;
  formType: string;
}

const enumStrArr = [
  ['境外人员-证件代码', 'certificateType'],
  ['境外-国籍', 'nationality'],
];

const CommonPickerMember: React.FunctionComponent<CommonPickerMemberProps> = forwardRef(
  ({ form, formType }, ref) => {
    const dicEnum = useDicEnum(enumStrArr);
    const [visible, setVisible] = useState(false);
    const [baseInfo, setBaseInfo] = useState<Noop>({});
    const baseRelId = getUrlParam('baseRelId');
    const populationType = getUrlParam('populationType') || '0';
    useImperativeHandle(ref, () => ({
      baseInfo,
    }));
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      getFieldError,
    } = form;

    const getBaseInfo = async () => {
      try {
        const fetchNameObj = {
          0: findBaseInfo,
          1: findOverseaPersonnelById,
        };
        const { data } = await fetchNameObj[populationType]({ id: baseRelId });
        setBaseInfo(data || {});
      } catch (error) {}
    };

    useEffect(() => {
      if (baseRelId && (formType === 'edit' || formType === 'transAdd')) {
        getBaseInfo();
      }
    }, []);

    const chooseMemberHandler = (value) => {
      setFieldsValue({
        baseRelId: {
          name: value.name,
          id: value.id,
        },
        idcardno: value.idcardno,
      });
      setVisible(false);
    };

    const FormAdd = () => (
      <>
        <FormField
          label="选择人员"
          labelRequired
          content={getFieldDecorator('baseRelId', {
            rules: [{ required: true, message: '请选择人员' }],
          })(
            <span
              onClick={() => {
                if (formType !== 'edit') {
                  setVisible(true);
                }
              }}
            >
              {(getFieldValue('baseRelId') &&
                getFieldValue('baseRelId').name) ||
                '请选择人员'}
            </span>,
          )}
          labelImg={null}
          fieldError={getFieldError('baseRelId')}
        />
        <FormField
          label={populationType === '0' ? '身份证号' : '证件号码'}
          labelImg={null}
          content={getFieldDecorator(
            'idcardno',
            {},
          )(
            <span>
              {getFieldValue('idcardno') ||
                `选择人员后读取${
                  populationType === '0' ? '身份证信息' : '证件号码'
                }`}
            </span>,
          )}
        />
        <ChooseMemberSingle
          visible={visible}
          key={1}
          triggerVisible={() => setVisible(false)}
          confirmHandler={(value) => chooseMemberHandler(value)}
        />
      </>
    );

    const renderContact = ({ mobilenumber, telephone }) => {
      if (mobilenumber && telephone) {
        return `${mobilenumber}、${telephone}`;
      }
      if (mobilenumber) return mobilenumber;
      if (telephone) return telephone;
      return null;
    };

    const FormEdit = ({ populationType }) => {
      const {
        englishName,
        englishSurname,
        nationality,
        certificateType,
        certificateNo,
        name,
        gender,
        idcardno,
        mobilenumber,
        telephone,
      } = baseInfo;
      if (populationType * 1 === 1) {
        const nationalityStr = dicEnum.nationality?.find(
          (item) => item.value === nationality,
        )?.label;
        const certificateTypeStr = dicEnum.certificateType?.find(
          (item) => item.value === certificateType,
        )?.label;
        return (
          <FormField
            extraItem={
              <div className={cx('form-picker-display')}>
                <div className={styles.line1}>
                  <span className={styles.title}>姓：</span>
                  {englishName}&nbsp;<span className={styles.title}>名：</span>
                  {englishSurname}
                  <img
                    src={gender !== 4 ? IconMale : IconFemale}
                    alt="IconMale"
                  />
                </div>
                <div className={styles.line2}>国籍: {nationalityStr}</div>
                <div className={styles.line2}>
                  证件类型: {certificateTypeStr}
                </div>
                <div className={styles.line2}>证件号码: {certificateNo}</div>
                <div className={styles.line2}>
                  联系方式: {renderContact({ mobilenumber, telephone })}
                </div>
              </div>
            }
          />
        );
      }
      return (
        <FormField
          extraItem={
            <div className={cx('form-picker-display')}>
              <div className={styles.line1}>
                {name}
                <img
                  src={gender !== 4 ? IconMale : IconFemale}
                  alt="IconMale"
                />
              </div>
              <div className={styles.line2}>身份证号: {idcardno}</div>
              <div className={styles.line2}>
                联系方式: {renderContact({ mobilenumber, telephone })}
              </div>
            </div>
          }
        />
      );
    };

    return (
      <div className={cx('form-picker')}>
        {formType === 'add' ? (
          <FormAdd />
        ) : (
          <FormEdit populationType={populationType} />
        )}
        <div className={cx('line-block')}></div>
      </div>
    );
  },
);

export default CommonPickerMember;
