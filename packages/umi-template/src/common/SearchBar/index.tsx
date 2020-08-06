/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { history, useRouteMatch, Noop } from 'umi';
import { SearchBar, Drawer } from 'antd-mobile';
import classnames from 'classnames/bind';
import moment from 'moment';
import IconSearchHigh from '@public/icon_search_high.png';
import IconSearchFilter from '@public/icon_search_filter.png';
import SideBar from './FilterContainer';
import styles from './index.less';

const cx = classnames.bind(styles);

interface TQSearchBarProps {
  submitHandler?: (val: string) => any;
  onChangeHandler?: (val: string) => any;
  filterChangeHandler?: (...args) => any;
  maxLength?: number;
}

// 实有人口采集
const populationGatherTagFilter = {
  groupItem1: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神病人',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 5,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '留守人员',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
};
// 户籍人口
const populationHouseholdTagFilter = {
  groupItem1: [
    {
      id: 1,
      checked: false,
      title: '本级',
    },
    {
      id: 2,
      checked: false,
      title: '本级及下辖',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '未完善',
    },
    {
      id: 2,
      checked: false,
      title: '已完善',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神病人',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 5,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '留守人口',
    },
  ],
  groupItem6: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 流动人口
const populationFlowTagFilter = {
  ...populationHouseholdTagFilter,
  groupItem1: [
    {
      id: 1,
      checked: false,
      title: '本级',
    },
    {
      id: 2,
      checked: false,
      title: '本级及下辖',
    },
  ],
};

// 刑满释放人口&社区矫正
const populationReleasedTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '精神病人',
    },
    {
      id: 2,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 3,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '留守人员',
    },
  ],
  groupItem6: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 刑满释放人口-境外&刑满释放人口-社区矫正
const populationReleasedOverseaTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '精神病人',
    },
    {
      id: 2,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 3,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 精神病
const populationMentalPatientTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '艾滋病人员',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '留守人员',
    },
  ],
  groupItem6: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 精神病-境外
const populationMentalPatientOverseaTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '艾滋病人员',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 吸毒人员
const populationDruggyTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神障碍',
    },
    {
      id: 4,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '留守人员',
    },
  ],
  groupItem6: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 吸毒人员-境外
const populationDruggyOverseaTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神障碍',
    },
    {
      id: 4,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 艾滋病人员
const populationAidsTagFilter = {
  groupItem1: [
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神障碍',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '留守人员',
    },
  ],
  groupItem6: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 艾滋病人员-境外
const populationAidsOverseaTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神障碍',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 境外人口
const populationOverseaTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '已关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '刑满释放',
    },
    {
      id: 2,
      checked: false,
      title: '社区矫正',
    },
    {
      id: 3,
      checked: false,
      title: '精神病人',
    },
    {
      id: 4,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 5,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem5: [
    {
      id: 1,
      checked: false,
      title: '重点青少年',
    },
  ],
};

// 留守人员
const populationRearPersonTagFilter = {
  ...JSON.parse(JSON.stringify(populationOverseaTagFilter)),
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
};

// 重点青少年-境内
const populationIdleYouthTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '精神病人',
    },
    {
      id: 2,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 3,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem4: [
    {
      id: 1,
      checked: false,
      title: '留守人员',
    },
  ],
  groupItem5: [
    {
      id: 2907,
      checked: false,
      title: '闲散青少年',
    },
    {
      id: 2910,
      checked: false,
      title: '服刑人员子女',
    },
    {
      id: 2908,
      checked: false,
      title: '有不良行为',
    },
    {
      id: 2911,
      checked: false,
      title: '农村留守人员',
    },
    {
      id: 2909,
      checked: false,
      title: '流浪乞讨未成年',
    },
    {
      id: 2912,
      checked: false,
      title: '其他',
    },
  ],
  groupItem6: [
    {
      id: 2,
      checked: false,
      title: '有',
    },
    {
      id: 1,
      checked: false,
      title: '无',
    },
  ],
};

// 重点青少年-境外
const populationIdleYouthOverseaTagFilter = {
  groupItem1: [
    {
      id: 0,
      checked: false,
      title: '未关注',
    },
    {
      id: 1,
      checked: false,
      title: '一般关注',
    },
    {
      id: 2,
      checked: false,
      title: '中等关注',
    },
    {
      id: 3,
      checked: false,
      title: '严重关注',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '未死亡',
    },
    {
      id: 2,
      checked: false,
      title: '已死亡',
    },
  ],
  groupItem3: [
    {
      id: 1,
      checked: false,
      title: '精神病人',
    },
    {
      id: 2,
      checked: false,
      title: '吸毒人员',
    },
    {
      id: 3,
      checked: false,
      title: '艾滋病人员',
    },
  ],
  groupItem4: [
    {
      id: 2907,
      checked: false,
      title: '闲散青少年',
    },
    {
      id: 2910,
      checked: false,
      title: '服刑人员子女',
    },
    {
      id: 2908,
      checked: false,
      title: '有不良行为',
    },
    {
      id: 2911,
      checked: false,
      title: '农村留守人员',
    },
    {
      id: 2909,
      checked: false,
      title: '流浪乞讨未成年',
    },
    {
      id: 2912,
      checked: false,
      title: '其他',
    },
  ],
  groupItem5: [
    {
      id: 2,
      checked: false,
      title: '有',
    },
    {
      id: 1,
      checked: false,
      title: '无',
    },
  ],
};

// 户籍管理
const householdManageTagFilter = {
  groupItem1: [
    {
      id: 1,
      checked: false,
      title: '最近一周',
    },
    {
      id: 2,
      checked: false,
      title: '最近一月',
    },
    {
      id: 3,
      checked: false,
      title: '最近一年',
    },
  ],
  groupItem2: [
    {
      id: 1,
      checked: false,
      title: '有家庭成员',
    },
    {
      id: 2,
      checked: false,
      title: '无家庭成员',
    },
  ],
};

const getTagFilter = (type) => {
  const tagFilterMap = new Map([
    ['populationGather', populationGatherTagFilter],
    ['populationHousehold', populationHouseholdTagFilter],
    ['populationFlowIn', populationFlowTagFilter],
    ['populationFlowOut', populationFlowTagFilter],
    ['populationReleased', populationReleasedTagFilter],
    ['populationReleasedOversea', populationReleasedOverseaTagFilter],
    ['populationCommunity', populationReleasedTagFilter],
    ['populationCommunityOversea', populationReleasedOverseaTagFilter],
    ['populationMentalPatient', populationMentalPatientTagFilter],
    ['populationMentalPatientOversea', populationMentalPatientOverseaTagFilter],
    ['populationDruggy', populationDruggyTagFilter],
    ['populationDruggyOversea', populationDruggyOverseaTagFilter],
    ['populationAids', populationAidsTagFilter],
    ['populationAidsOversea', populationAidsOverseaTagFilter],
    ['populationOversea', populationOverseaTagFilter],
    ['populationRearPerson', populationRearPersonTagFilter],
    ['populationIdleYouth', populationIdleYouthTagFilter],
    ['populationIdleYouthOversea', populationIdleYouthOverseaTagFilter],
    ['householdManage', householdManageTagFilter],
  ]);
  return tagFilterMap.get(type) || populationGatherTagFilter;
};

const getPlaceHolder = (type) => {
  if (type === 'populationOversea') {
    return '证件号码/联系手机/外文姓/外文名';
  }
  if (type === 'populationRearPerson') {
    return '姓名/手机号/证件号码';
  }
  if (type === 'householdManage') {
    return '户号';
  }
  return '姓名/身份证号码/手机号';
};

const TQSearchBar: React.FunctionComponent<TQSearchBarProps> = ({
  submitHandler,
  maxLength,
  onChangeHandler,
  filterChangeHandler,
}) => {
  const {
    params: { type },
  } = useRouteMatch();
  const initTagFilter = getTagFilter(type);
  const placeholder = getPlaceHolder(type);
  const [open, setOpen] = useState(false);
  const [initValue, setInitValue] = useState(initTagFilter);
  const [saveTagValue, setSavedTagValue] = useState(
    JSON.parse(JSON.stringify(initTagFilter)),
  );
  const searchBarSubmit = (val: string) => {
    if (submitHandler) {
      submitHandler(val);
    }
  };

  const navTo = (url: string) => {
    history.push(url);
  };

  const triggerDrawer = () => {
    setOpen(true);
  };

  const getFilterTime = (id: number): any[] => {
    if (id === 1) {
      return [
        moment().subtract(7, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ];
    }
    if (id === 2) {
      return [
        moment().subtract(1, 'months').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ];
    }
    if (id === 3) {
      return [
        moment().subtract(1, 'years').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ];
    }
    return [];
  };

  const getFilterObj = (
    {
      specialPopulationTag,
      keyPopulationTag,
      focusOnYouthTag,
      baseInfoUpdateDateStart,
      baseInfoUpdateDateEnd,
      houseFamilyUpdateDateStart,
      houseFamilyUpdateDateEnd,
      status,
      isFullInfo,
      displayLevel,
      ifFocus,
      isHaveCrime,
      idleYouthType,
      focusLevel,
    }: Partial<Noop>,
    type,
  ): Noop => {
    const obj: Noop = {};
    specialPopulationTag && (obj.specialPopulationTag = specialPopulationTag);
    keyPopulationTag && (obj.keyPopulationTag = keyPopulationTag);
    focusOnYouthTag && (obj.focusOnYouthTag = focusOnYouthTag);
    baseInfoUpdateDateStart &&
      (obj.baseInfoUpdateDateStart = baseInfoUpdateDateStart);
    baseInfoUpdateDateEnd &&
      (obj.baseInfoUpdateDateEnd = baseInfoUpdateDateEnd);
    (status || status === 0) && (obj.status = status);
    displayLevel && (obj.displayLevel = displayLevel);
    (isHaveCrime || isHaveCrime === 0) && (obj.isHaveCrime = isHaveCrime);
    (idleYouthType || idleYouthType === 0) &&
      (obj.idleYouthType = idleYouthType);
    if (focusLevel || focusLevel === 0) {
      if (focusLevel === 0) {
        obj.focusLevel = -1;
      } else {
        obj.focusLevel = focusLevel;
      }
    }
    (ifFocus || ifFocus === 0) && (obj.ifFocus = ifFocus);
    houseFamilyUpdateDateStart &&
      (obj.houseFamilyUpdateDateStart = houseFamilyUpdateDateStart);
    houseFamilyUpdateDateEnd &&
      (obj.houseFamilyUpdateDateEnd = houseFamilyUpdateDateEnd);
    if (type === 'populationFlowIn' || type === 'populationFlowOut') {
      // 流入流出
      (isFullInfo || isFullInfo === 0) && (obj.isFullFloatingInfo = isFullInfo);
    } else {
      // 户籍人口
      (isFullInfo || isFullInfo === 0) &&
        (obj.isFullHouseholdInfo = isFullInfo);
    }
    return obj;
  };

  const filterTagValue = (tagFilter: any, type): Noop => {
    const statusMap = new Map([
      [1, 0],
      [2, 1],
    ]);
    const isFullInfoMap = new Map([
      [1, 0],
      [2, 1],
    ]);
    const obj: Noop = {};
    if (type === 'populationGather') {
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
      } = tagFilter;
      const specialPopulationTag = groupItem1.find((item) => item.checked)
        ?.title;
      const keyPopulationTag = groupItem2.find((item) => item.checked)?.title;
      const focusOnYouthTag = groupItem3.find((item) => item.checked)?.title;
      const baseInfoUpdateDateId = groupItem4.find((item) => item.checked)?.id;
      const [baseInfoUpdateDateStart, baseInfoUpdateDateEnd] = getFilterTime(
        baseInfoUpdateDateId,
      );
      const statusVal = groupItem5.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      return getFilterObj(
        {
          specialPopulationTag,
          keyPopulationTag,
          focusOnYouthTag,
          baseInfoUpdateDateStart,
          baseInfoUpdateDateEnd,
          status,
        },
        type,
      );
    }
    if (
      type === 'populationHousehold' ||
      type === 'populationFlowIn' ||
      type === 'populationFlowOut'
    ) {
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
        groupItem6,
      } = tagFilter;
      const displayLevelVal = groupItem1.find((item) => item.checked);
      const displayLevel = displayLevelVal && displayLevelVal.id;
      const isFullInfoVal = groupItem2.find((item) => item.checked);
      const isFullInfo =
        isFullInfoVal &&
        isFullInfoVal.id &&
        isFullInfoMap.get(isFullInfoVal.id);
      const specialPopulationTag = groupItem4.find((item) => item.checked)
        ?.title;
      const keyPopulationTag = groupItem5.find((item) => item.checked)?.title;
      const focusOnYouthTag = groupItem6.find((item) => item.checked)?.title;
      const statusVal = groupItem3.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      return getFilterObj(
        {
          specialPopulationTag,
          keyPopulationTag,
          focusOnYouthTag,
          displayLevel,
          isFullInfo,
          status,
        },
        type,
      );
    }
    if (type === 'populationOversea' || type === 'populationRearPerson') {
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
      } = tagFilter;
      const ifFocus = groupItem1.find((item) => item.checked)?.id;
      const focusLevel = groupItem1.find((item) => item.checked)?.id;
      const baseInfoUpdateDateId = groupItem2.find((item) => item.checked)?.id;
      const [baseInfoUpdateDateStart, baseInfoUpdateDateEnd] = getFilterTime(
        baseInfoUpdateDateId,
      );
      const statusVal = groupItem3.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      const specialPopulationTag = groupItem4.find((item) => item.checked)
        ?.title;
      const focusOnYouthTag = groupItem5.find((item) => item.checked)?.title;
      const commonObj: Noop = {
        specialPopulationTag,
        focusOnYouthTag,
        baseInfoUpdateDateStart,
        baseInfoUpdateDateEnd,
        status,
      };
      if (type === 'populationOversea') {
        commonObj.ifFocus = ifFocus;
      } else {
        commonObj.focusLevel = focusLevel;
      }
      return getFilterObj(commonObj, type);
    }
    if (type === 'populationIdleYouth') {
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
        groupItem6,
      } = tagFilter;
      const focusLevel = groupItem1.find((item) => item.checked)?.id;
      const statusVal = groupItem2.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      const specialPopulationTag = groupItem3.find((item) => item.checked)
        ?.title;
      const keyPopulationTag = groupItem4.find((item) => item.checked)?.title;
      const idleYouthType = groupItem5.find((item) => item.checked)?.id;
      const isHaveCrimeVal = groupItem6.find((item) => item.checked);
      const isHaveCrime =
        isHaveCrimeVal &&
        isHaveCrimeVal.id &&
        isFullInfoMap.get(isHaveCrimeVal.id);
      return getFilterObj(
        {
          specialPopulationTag,
          focusLevel,
          keyPopulationTag,
          idleYouthType,
          isHaveCrime,
          status,
        },
        type,
      );
    }
    if (type === 'populationIdleYouthOversea') {
      // 关注 死亡 特殊人群 人员类型 有无违法记录
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
      } = tagFilter;
      const focusLevel = groupItem1.find((item) => item.checked)?.id;
      const statusVal = groupItem2.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      const specialPopulationTag = groupItem3.find((item) => item.checked)
        ?.title;
      const idleYouthType = groupItem4.find((item) => item.checked)?.id;
      const isHaveCrimeVal = groupItem5.find((item) => item.checked);
      const isHaveCrime =
        isHaveCrimeVal &&
        isHaveCrimeVal.id &&
        isFullInfoMap.get(isHaveCrimeVal.id);
      (focusLevel || focusLevel === 0) && (obj.focusLevel = focusLevel);
      (status || status === 0) && (obj.status = status);
      specialPopulationTag && (obj.specialPopulationTag = specialPopulationTag);
      idleYouthType && (obj.idleYouthType = idleYouthType);
      (isHaveCrime || isHaveCrime === 0) && (obj.isHaveCrime = isHaveCrime);
      return getFilterObj(
        {
          specialPopulationTag,
          focusLevel,
          idleYouthType,
          isHaveCrime,
          status,
        },
        type,
      );
    }
    if (
      type === 'populationReleased' ||
      type === 'populationCommunity' ||
      type === 'populationMentalPatient' ||
      type === 'populationDruggy' ||
      type === 'populationAids'
    ) {
      // 关注 最近更新 死亡 特殊人群 重点人群 重点青少年
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
        groupItem6,
      } = tagFilter;
      const focusLevel = groupItem1.find((item) => item.checked)?.id;
      const baseInfoUpdateDateId = groupItem2.find((item) => item.checked)?.id;
      const [baseInfoUpdateDateStart, baseInfoUpdateDateEnd] = getFilterTime(
        baseInfoUpdateDateId,
      );
      const statusVal = groupItem3.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      const specialPopulationTag = groupItem4.find((item) => item.checked)
        ?.title;
      const keyPopulationTag = groupItem5.find((item) => item.checked)?.title;
      const focusOnYouthTag = groupItem6.find((item) => item.checked)?.title;
      return getFilterObj(
        {
          specialPopulationTag,
          keyPopulationTag,
          focusOnYouthTag,
          focusLevel,
          baseInfoUpdateDateStart,
          baseInfoUpdateDateEnd,
          status,
        },
        type,
      );
    }
    if (
      type === 'populationReleasedOversea' ||
      type === 'populationCommunityOversea' ||
      type === 'populationMentalPatientOversea' ||
      type === 'populationDruggyOversea' ||
      type === 'populationAidsOversea'
    ) {
      // 关注 最近更新 死亡 特殊人群 重点青少年
      const {
        groupItem1,
        groupItem2,
        groupItem3,
        groupItem4,
        groupItem5,
      } = tagFilter;
      const focusLevel = groupItem1.find((item) => item.checked)?.id;
      const baseInfoUpdateDateId = groupItem2.find((item) => item.checked)?.id;
      const [baseInfoUpdateDateStart, baseInfoUpdateDateEnd] = getFilterTime(
        baseInfoUpdateDateId,
      );
      const statusVal = groupItem3.find((item) => item.checked);
      const status = statusVal && statusVal.id && statusMap.get(statusVal.id);
      const specialPopulationTag = groupItem4.find((item) => item.checked)
        ?.title;
      const focusOnYouthTag = groupItem5.find((item) => item.checked)?.title;
      return getFilterObj(
        {
          specialPopulationTag,
          focusOnYouthTag,
          focusLevel,
          baseInfoUpdateDateStart,
          baseInfoUpdateDateEnd,
          status,
        },
        type,
      );
    }
    if (type === 'householdManage') {
      const { groupItem1 } = tagFilter;
      const houseFamilyUpdateDateId = groupItem1.find((item) => item.checked)
        ?.id;
      const [
        houseFamilyUpdateDateStart,
        houseFamilyUpdateDateEnd,
      ] = getFilterTime(houseFamilyUpdateDateId);
      return getFilterObj(
        {
          houseFamilyUpdateDateStart,
          houseFamilyUpdateDateEnd,
        },
        type,
      );
    }
    return obj;
  };

  // 点击mask 存储state赋值过去
  const onOpenChange = (open) => {
    setInitValue(JSON.parse(JSON.stringify(saveTagValue)));
    setOpen(open);
  };

  // 保存，关闭drawer， 存储state与展现state一致
  const confirmHandler = (data) => {
    const savedData = JSON.parse(JSON.stringify(data));
    setInitValue(data);
    setSavedTagValue(savedData);
    if (filterChangeHandler) {
      filterChangeHandler(filterTagValue(savedData, type));
    }
    setOpen(false);
  };

  const resetHandler = (initValue, saveTagValue) => {
    setInitValue(initValue);
    setSavedTagValue(saveTagValue);
  };

  const onChange = (val: string) => {
    if (onChangeHandler) {
      onChangeHandler(val);
    }
  };

  const searchBarChange = debounce(onChange, 500);

  const renderType = (type) => {
    if (type !== 'populationOversea') {
      if (type === 'householdManage') {
        return 3;
      }
      return 1;
    }
    return 2;
  };

  return (
    <div className={styles.search}>
      <SearchBar
        onSubmit={searchBarSubmit}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={searchBarChange}
      />
      <div className={cx('tool-bar')}>
        <img
          onTouchEnd={() =>
            navTo(`/population/advancedSearch?type=${renderType(type)}`)
          }
          src={IconSearchHigh}
          alt="IconSearchHigh"
        />
        <img
          onTouchEnd={() => triggerDrawer()}
          src={IconSearchFilter}
          alt="IconSearchFilter"
        />
      </div>
      <Drawer
        className="my-drawer"
        enableDragHandle
        sidebar={
          <SideBar
            resetHandler={resetHandler}
            initTagFilterValue={initValue}
            savedTagFilterValue={saveTagValue}
            triggerDrawer={() => setOpen(false)}
            confirmHandler={confirmHandler}
          />
        }
        open={open}
        onOpenChange={onOpenChange}
        position="right"
      >
        <></>
      </Drawer>
    </div>
  );
};

export default TQSearchBar;
