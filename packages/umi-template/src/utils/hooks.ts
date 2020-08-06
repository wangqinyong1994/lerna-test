/* eslint-disable consistent-return */
import { useState, useEffect, useReducer } from 'react';
import { getDicEnumItem } from '@/utils';

type DicEnum = Array<Array<any>>;

// 分页
export const usePage = () => {
  const initialState = {
    curPage: 1,
    data: [],
    size: 1,
    total: 1,
    totalPage: 1,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'init':
        return {
          ...state,
          ...action.payload,
        };
      case 'concat':
        return {
          ...state,
          ...action.payload,
          data: state.data.concat(action.payload.data),
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

// 获取字典项

export const useDicEnum = (arr: DicEnum, enhancer?: (val) => any) => {
  const [dicEnum, setDicEnum] = useState<{ [key: string]: any }>({});
  const _getDicEnumItem = async () => {
    const obj: { [key: string]: any } = {};
    const res = await Promise.all(
      arr.map(async (item) =>
        getDicEnumItem(item[0], (data) => {
          if (enhancer) {
            return enhancer(data);
          }
          return data.map((item) => ({
            label: item.displayname,
            value: item.id,
          }));
        }),
      ),
    );

    arr.forEach((item, index) => {
      obj[item[1]] = res[index];
    });
    setDicEnum(obj);
  };

  useEffect(() => {
    _getDicEnumItem();
  }, []);
  return dicEnum;
};

// 获取字典项-标签选择

export const useDicEnumTag = (arr: DicEnum, enhancer?: (val) => any) => {
  const [dicEnum, setDicEnum] = useState<any[]>([]);
  const _getDicEnumItem = async () => {
    const res = await Promise.all(
      arr.map(async (item) =>
        getDicEnumItem(item[0], (data) => {
          if (enhancer) {
            return enhancer(data);
          }
          return data.map((item) => ({
            label: item.displayname,
            value: item.id,
          }));
        }),
      ),
    );
    setDicEnum(res[0]);
  };

  useEffect(() => {
    _getDicEnumItem();
  }, []);
  return [dicEnum, setDicEnum];
};

export const useDicEnumSingle = (name) => {
  const [dicEnum, setDicEnum] = useState<any[]>([]);
  const _getDicEnumItem = async () => {
    const res = (await getDicEnumItem(name)).map((item) => ({
      ...item,
      checked: false,
    }));
    setDicEnum(res);
  };
  useEffect(() => {
    _getDicEnumItem();
  }, []);
  return [dicEnum, setDicEnum];
};
