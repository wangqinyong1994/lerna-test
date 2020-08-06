/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import classnames from 'classnames/bind';
import { useRouteMatch } from 'umi';
import ControlTag from '@/components/Tag';
import styles from './FilterContainer.less';

const cx = classnames.bind(styles);
interface TagItem {
  id: number;
  checked: boolean;
  title: string;
}

interface TagGroupProps {
  title: string;
  single?: boolean;
  initTagArr: TagItem[];
  reset?: (fn) => void;
}

interface FilterContainerProps {
  triggerDrawer?: (...args) => void;
  confirmHandler?: (...args) => void;
  resetHandler?: (...args) => void;
  initTagFilterValue: {
    [name: string]: any;
  };
  // 存储的tag组值, 只在confirm阶段赋值
  savedTagFilterValue?: {
    [name: string]: any;
  };
}

export const TagGroup = ({
  title,
  single = true,
  initTagArr,
}: TagGroupProps) => {
  const [tagArr, setTagArr] = useState(initTagArr);
  const touchHandler = (touchTag: { id: number; checked: any }) => {
    const _tagArr = tagArr.slice().map((tag) => {
      if (tag.id === touchTag.id) {
        tag.checked = !touchTag.checked;
      } else {
        if (single) {
          tag.checked = false;
        }
      }
      return tag;
    });
    setTagArr(_tagArr);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>{title}</div>
      <div className={styles.container}>
        {tagArr &&
          tagArr.length > 0 &&
          tagArr.map((tag) => (
            <ControlTag
              key={tag.id}
              touchHandler={touchHandler}
              value={tag.id}
              checked={tag.checked}
              title={tag.title}
            />
          ))}
      </div>
    </div>
  );
};

export default ({
  initTagFilterValue,
  savedTagFilterValue,
  confirmHandler,
  resetHandler,
}: FilterContainerProps) => {
  const {
    params: { type },
  } = useRouteMatch();

  const FilterContainer = () => {
    if (type === 'populationGather') {
      return (
        <>
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem1}
          />
          <TagGroup
            title="重点人群"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup
            title="重点青少年"
            initTagArr={initTagFilterValue.groupItem3}
          />
          <TagGroup
            title="最近更新"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem5} />
        </>
      );
    }
    if (type === 'populationHousehold') {
      return (
        <>
          <TagGroup title="层级" initTagArr={initTagFilterValue.groupItem1} />
          <TagGroup
            title="户籍信息"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem3} />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup
            title="重点人群"
            initTagArr={initTagFilterValue.groupItem5}
          />
          <TagGroup
            title="重点青少年"
            initTagArr={initTagFilterValue.groupItem6}
          />
        </>
      );
    }
    if (type === 'populationFlowIn' || type === 'populationFlowOut') {
      return (
        <>
          <TagGroup title="层级" initTagArr={initTagFilterValue.groupItem1} />
          <TagGroup
            title="流动信息"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem3} />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup
            title="重点人群"
            initTagArr={initTagFilterValue.groupItem5}
          />
          <TagGroup
            title="重点青少年"
            initTagArr={initTagFilterValue.groupItem6}
          />
        </>
      );
    }
    if (
      type === 'populationReleased' ||
      type === 'populationCommunity' ||
      type === 'populationMentalPatient' ||
      type === 'populationDruggy' ||
      type === 'populationAids'
    ) {
      return (
        <>
          <TagGroup
            title="关注人员"
            initTagArr={initTagFilterValue.groupItem1}
          />
          <TagGroup
            title="最近更新"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem3} />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup
            title="重点人群"
            initTagArr={initTagFilterValue.groupItem5}
          />
          <TagGroup
            title="重点青少年"
            initTagArr={initTagFilterValue.groupItem6}
          />
        </>
      );
    }
    if (
      type === 'populationReleasedOversea' ||
      type === 'populationCommunityOversea' ||
      type === 'populationMentalPatientOversea' ||
      type === 'populationDruggyOversea' ||
      type === 'populationAidsOversea'
    ) {
      return (
        <>
          <TagGroup
            title="关注人员"
            initTagArr={initTagFilterValue.groupItem1}
          />
          <TagGroup
            title="最近更新"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem3} />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup
            title="重点青少年"
            initTagArr={initTagFilterValue.groupItem5}
          />
        </>
      );
    }
    if (type === 'populationOversea' || type === 'populationRearPerson') {
      return (
        <>
          <TagGroup
            title="关注"
            initTagArr={initTagFilterValue.groupItem1}
            key={1}
          />
          <TagGroup
            title="最近更新"
            initTagArr={initTagFilterValue.groupItem2}
            key={2}
          />
          <TagGroup
            title="死亡"
            initTagArr={initTagFilterValue.groupItem3}
            key={3}
          />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem4}
            key={4}
          />
          <TagGroup
            title="重点青少年"
            initTagArr={initTagFilterValue.groupItem5}
            key={5}
          />
        </>
      );
    }
    if (type === 'populationIdleYouth') {
      return (
        <>
          <TagGroup title="关注" initTagArr={initTagFilterValue.groupItem1} />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem2} />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem3}
          />
          <TagGroup
            title="重点人群"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup
            title="人员类型"
            initTagArr={initTagFilterValue.groupItem5}
          />
          <TagGroup
            title="有无违法记录"
            initTagArr={initTagFilterValue.groupItem6}
          />
        </>
      );
    }
    if (type === 'populationIdleYouthOversea') {
      return (
        <>
          <TagGroup title="关注" initTagArr={initTagFilterValue.groupItem1} />
          <TagGroup title="死亡" initTagArr={initTagFilterValue.groupItem2} />
          <TagGroup
            title="特殊人群"
            initTagArr={initTagFilterValue.groupItem3}
          />
          <TagGroup
            title="人员类型"
            initTagArr={initTagFilterValue.groupItem4}
          />
          <TagGroup
            title="有无违法记录"
            initTagArr={initTagFilterValue.groupItem5}
          />
        </>
      );
    }
    if (type === 'householdManage') {
      return (
        <>
          <TagGroup
            title="最近更新"
            initTagArr={initTagFilterValue.groupItem1}
          />
        </>
      );
    }
    if (type === 'buildingInfo') {
      return (
        <>
          <TagGroup
            title="维护情况"
            initTagArr={initTagFilterValue.groupItem1}
          />
          <TagGroup
            title="最近更新"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup
            title="楼宇类型"
            initTagArr={initTagFilterValue.groupItem3}
          />
          <TagGroup
            title="建筑结构"
            initTagArr={initTagFilterValue.groupItem4}
          />
        </>
      );
    }
    if (type === 'houseManage') {
      return (
        <>
          <TagGroup
            title="是否为出租房"
            initTagArr={initTagFilterValue.groupItem1}
          />
          <TagGroup
            title="关注状态"
            initTagArr={initTagFilterValue.groupItem2}
          />
          <TagGroup
            title="最近更新时间"
            initTagArr={initTagFilterValue.groupItem3}
          />
        </>
      );
    }
    return null;
  };

  const getInitTagFilter = (tagFilter) => {
    const obj = {};
    Object.entries(tagFilter).forEach((arr: any[]) => {
      const [name, value] = arr;
      value.forEach((item) => {
        item.checked = false;
      });
      obj[name] = value;
    });
    return obj;
  };

  useEffect(
    () => () => {
      getInitTagFilter(initTagFilterValue);
    },
    [],
  );

  // 重置 展示state清空， 存储state不变
  const reset = () => {
    const savedTagFilter = JSON.parse(JSON.stringify(savedTagFilterValue));
    const showTagFilter = getInitTagFilter(initTagFilterValue) as any;
    if (resetHandler) {
      resetHandler(showTagFilter, savedTagFilter);
    }
  };

  // 确认 展示state与存储state一致
  const confirm = () => {
    if (confirmHandler) {
      confirmHandler(initTagFilterValue);
    }
  };

  return (
    <div className={cx('side-bar')}>
      <div className={cx('side-bar-container')}>
        <FilterContainer />
      </div>
      <div className={styles.blank}></div>
      <div className={cx('side-bar-footer')}>
        <Button className={cx('btn', 'reset')} onClick={reset}>
          重置
        </Button>
        <Button
          type="primary"
          className={cx('btn', 'confirm')}
          onClick={confirm}
        >
          确定
        </Button>
      </div>
    </div>
  );
};
