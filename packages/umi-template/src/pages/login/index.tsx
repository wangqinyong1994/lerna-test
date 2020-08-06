/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { connect, history } from 'umi';
import classnames from 'classnames/bind';
import { InputItem, Button } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import md5 from 'blueimp-md5';
import { UmiProps } from '@/models/connect';
import { login } from '@/services';
import { setToken, checkVersion } from '@/utils';

import styles from './index.less';

const cx = classnames.bind(styles);

interface LoginProps extends UmiProps {
  form: formShape;
  modelToken: string;
  modelUserInfo?: any;
}

const Login: React.FC<LoginProps> = ({ form, dispatch, modelUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields } = form;
  const submit = useCallback(async () => {
    validateFields(async (errors, values) => {
      if (!errors) {
        try {
          setLoading(true);
          const { identifier, credential } = values;
          const {
            success,
            data: { accessToken },
          } = await login({
            identifier,
            credential: md5(credential),
          });

          if (success) {
            setToken({
              Authorization: accessToken,
            });
            dispatch({
              type: 'user/effects__viewUserInfo',
            });
            history.replace('/');
            localStorage.removeItem('ORGINFO');
            // 字典项版本号检测
            checkVersion();
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    });
  }, []);

  return (
    <>
      <div className={cx('login-wrap')}>
        {getFieldDecorator('identifier', {
          rules: [{ required: true, message: '请输入用户名' }],
        })(<InputItem maxLength={80} clear placeholder="请输入用户名" />)}
        {getFieldDecorator('credential', {
          rules: [{ required: true, message: '请输入密码' }],
        })(<InputItem maxLength={80} clear placeholder="请输入密码" />)}
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          onClick={submit}
        >
          登录
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = ({ user: { userInfo } }) => ({
  modelUserInfo: userInfo,
});

const LoginForm = createForm()(Login);

export default connect(mapStateToProps)(LoginForm);
