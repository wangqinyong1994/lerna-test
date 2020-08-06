import React, { useCallback, useState } from 'react';
import { Calendar } from 'antd-mobile';
import FormField from '@/components/FormField';
import moment from 'moment';
import { formShape } from 'rc-form';
import { moment2Date } from '@/utils';

interface CalendarFormItemProps {
  label: string;
  labelRequired?: boolean;
  tips?: string;
  defaultTimeValue?: any;
  form: formShape;
  itemName: string;
}

const CalendarFormItem = ({
  label,
  labelRequired = false,
  tips = '',
  form,
  itemName,
}: CalendarFormItemProps) => {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const {
    getFieldDecorator,
    getFieldValue,
    getFieldError,
    setFieldsValue,
  } = form;

  const calendarOnConfirm = (startTime, endTime) => {
    const timeArr = [
      moment(startTime).format('YYYY-MM-DD'),
      moment(endTime).format('YYYY-MM-DD'),
    ];
    setFieldsValue({
      [itemName]: timeArr,
    });
    setCalendarVisible(false);
  };

  const renderCalendarText = () => {
    const calendarArr = getFieldValue(itemName);
    if (calendarArr && calendarArr.length && calendarArr[0]) {
      return `${calendarArr[0].split(' ')[0]}~${calendarArr[1].split(' ')[0]}`;
    }
    return null;
  };

  const renderDefaultTimeValue = useCallback((): [Date, Date] => {
    const calendarArr = getFieldValue(itemName) as [Date, Date];
    if (calendarArr && calendarArr[0] && calendarArr[1]) {
      return [
        moment2Date(calendarArr[0]) as Date,
        moment2Date(calendarArr[1]) as Date,
      ];
    }
    return [new Date(), new Date()];
  }, [getFieldValue(itemName)]);

  return (
    <>
      <FormField
        label={label}
        labelRequired={labelRequired}
        content={getFieldDecorator(itemName, {
          rules: [
            { required: labelRequired, message: tips || `请选择${label}` },
          ],
        })(
          <span onClick={() => setCalendarVisible(true)}>
            {renderCalendarText() || tips || `请选择${label}`}
          </span>,
        )}
        fieldError={getFieldError(itemName)}
      />
      <Calendar
        visible={calendarVisible}
        defaultValue={renderDefaultTimeValue()}
        onCancel={() => setCalendarVisible(false)}
        onConfirm={calendarOnConfirm}
      />
    </>
  );
};

export default CalendarFormItem;
