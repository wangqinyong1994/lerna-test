/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from 'react';
import { history, useRouteMatch, useLocation } from 'umi';
import Draggable from 'react-draggable';
import classnames from 'classnames/bind';
import { getUrlParam, getPositionWithDevice } from '@/utils';

import IconFloatAdd from '@public/icon_float_add.png';
import IconOut2In from '@public/icon_out2In.png';
import IconIn2Out from '@public/icon_in2out.png';
import IconFlowOut2In from '@public/icon_flow_out2In.png';
import IconFlowIn2Out from '@public/icon_flow_in2Out.png';

import styles from './index.less';

const cx = classnames.bind(styles);

interface FloatBtnProps {
  defaultPosition: {
    x: number;
    y: number;
  };
  floatType?: 'add' | 'oversea' | 'flow';
  pageType: string;
}

const FloatBtn: React.FC<FloatBtnProps> = ({
  defaultPosition,
  floatType = 'add',
  pageType,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    params: { type },
  } = useRouteMatch();
  const { pathname, search } = useLocation();
  const positionObj = useMemo(
    () => ({
      x: getPositionWithDevice(defaultPosition.x),
      y: getPositionWithDevice(defaultPosition.y),
    }),
    [],
  );
  const replaceTo = (url) => {
    history.replace(url);
  };

  const navTo = (url) => {
    history.push(url);
  };

  const onClick = (...args) => {
    if (floatType === 'add') {
      if (pageType.indexOf('populationRearPerson') > -1) {
        navTo('/population/populationRearPerson/form/add');
      } else if (pageType.indexOf('populationIdleYouth') > -1) {
        navTo(
          `/population/populationIdleYouth/form/add?populationType=${
            pageType === 'populationIdleYouth' ? 0 : 1
          }`,
        );
      } else if (pageType.indexOf('populationReleased') > -1) {
        navTo(
          `/population/populationReleased/form/add?populationType=${
            pageType === 'populationReleased' ? 0 : 1
          }`,
        );
      } else if (pageType.indexOf('populationCommunity') > -1) {
        navTo(
          `/population/populationCommunity/form/add?populationType=${
            pageType === 'populationCommunity' ? 0 : 1
          }`,
        );
      } else if (pageType.indexOf('populationMentalPatient') > -1) {
        navTo(
          `/population/populationMentalPatient/form/add?populationType=${
            pageType === 'populationMentalPatient' ? 0 : 1
          }`,
        );
      } else if (pageType.indexOf('populationDruggy') > -1) {
        navTo(
          `/population/populationDruggy/form/add?populationType=${
            pageType === 'populationDruggy' ? 0 : 1
          }`,
        );
      } else if (pageType.indexOf('populationAids') > -1) {
        navTo(
          `/population/populationAids/form/add?populationType=${
            pageType === 'populationAids' ? 0 : 1
          }`,
        );
      } else if (pageType.indexOf('populationGather') > -1) {
        navTo('/population/populationGather/form/add');
      } else if (pageType.indexOf('populationOversea') > -1) {
        navTo('/population/populationOversea/form/add');
      } else if (pageType.indexOf('householdMember') > -1) {
        // Todo 户籍管理-成员管理-添加人员
        navTo(
          `/population/household/addMember?accountNumber=${getUrlParam(
            'accountNumber',
          )}`,
        );
      } else if (pageType.indexOf('buildingInfo') > -1) {
        navTo('/buildingManage/form/add');
      } else if (pageType.indexOf('householderManage') > -1) {
        // Todo 住户新增
        navTo(
          `/choosePage/addHouseholder?populationType=${
            pageType === 'householderManage' ? 0 : 1
          }&id=${getUrlParam('id')}`,
        );
      } else if (pageType.indexOf('houseManage') > -1) {
        // 房屋管理
        navTo('/buildingManage/tenementAdd/form/add');
      } else {
        navTo('/population/populationGather/form/add');
      }
    } else if (floatType === 'oversea') {
      // 境内境外切换
      const url = pathname.replace(type, () => {
        if (type.indexOf('Oversea') > -1) {
          return type.replace('Oversea', '');
        }
        return `${type}Oversea`;
      });
      replaceTo(url + search);
    } else {
      // 流动人口流入流出切换
      const url = pathname.replace(type, () => {
        if (type.indexOf('populationFlowIn') > -1) {
          return type.replace('populationFlowIn', 'populationFlowOut');
        }
        return type.replace('populationFlowOut', 'populationFlowIn');
      });
      replaceTo(url);
    }
  };

  const onDrag = (...args) => {
    setIsDragging(true);
  };

  const onStop = (...args) => {
    if (isDragging) {
      onDrag(...args);
    } else {
      onClick(...args);
    }
    setIsDragging(false);
  };

  const renderIconImg = () => {
    let iconImg;
    if (floatType !== 'add') {
      if (floatType === 'oversea') {
        if (type.indexOf('Oversea') > -1) {
          iconImg = IconOut2In;
        } else {
          iconImg = IconIn2Out;
        }
      } else if (floatType === 'flow') {
        if (type.indexOf('populationFlowIn') > -1) {
          iconImg = IconFlowOut2In;
        } else {
          iconImg = IconFlowIn2Out;
        }
      }
    } else {
      iconImg = IconFloatAdd;
    }
    return iconImg;
  };

  return (
    <div className={cx('float-btn-wrap')}>
      <Draggable onDrag={onDrag} onStop={onStop} defaultPosition={positionObj}>
        <img
          className={cx('float-btn')}
          src={renderIconImg()}
          alt="IconFloatAdd"
        />
      </Draggable>
    </div>
  );
};

export default FloatBtn;
