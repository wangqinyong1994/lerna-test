import { AnyAction } from 'redux';
import { Router } from 'umi';
import { UserStateType } from '@/models/user';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    login?: boolean;
    user?: boolean;
    options?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  user: UserStateType;
}

export interface UmiProps extends Partial<Router> {
  dispatch: <T extends AnyAction>(action: T) => Promise<any> | T;
}
