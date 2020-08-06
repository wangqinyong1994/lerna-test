/* eslint-disable @typescript-eslint/no-unused-vars */
import { Effect, Reducer } from 'umi';
import { viewUserInfo } from '@/services';
import { USERINFO } from '@/utils/storageConst';

export interface UserInfoType {}

export interface UserStateType {
  userInfo: UserInfoType | null;
}

export interface UserModelType {
  namespace: string;
  state: UserStateType;
  reducers: {
    reducers__setUserInfo: Reducer;
  };
  effects: {
    effects__viewUserInfo: Effect;
  };
}

const defaultState = {
  userInfo: null,
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: defaultState,

  reducers: {
    reducers__setUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload.userInfo,
      };
    },
  },

  effects: {
    *effects__viewUserInfo({ payload = {} }, { call, put }) {
      const { success, data } = yield call(viewUserInfo);
      if (success) {
        localStorage.setItem(USERINFO, JSON.stringify(data));
        yield put({
          type: 'reducers__setUserInfo',
          payload: { userInfo: data },
        });
      }
    },
  },
};

export default UserModel;
