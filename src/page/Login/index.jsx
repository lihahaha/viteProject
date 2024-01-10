import React, { Component, useState, useEffect } from 'react';
import style from './index.module.less';
import { postLogin } from '@/services/apis/common';
import { InputItem, Button, Toast } from 'antd-mobile';
import {
  queryParams,
  encryptionString,
  decryptionString,
  getUrlParams,
  encryption
} from '@/utils';
import { encryptionKey } from '@/utils/constant';
import useStores from '@/utils/useStores';
import accountPng from '@/assets/img/login/account.png';
import passIconPng from '@/assets/img/login/passIcon.png';

const Index = () => {
  const { CommonStore } = useStores();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const _userId = window.localStorage.getItem('userId') || '';
    const _password = window.localStorage.getItem('password') || '';
    const decryptPassword = decryptionString(_password);
    setUserId(_userId);
    setPassword(decryptPassword);
  }, []);

  const onSubmit = () => {
    if (!userId || !password) {
      Toast.fail('请输入用户名/密码！');
      return;
    }
    // postLogin({
    //   authTicket: userId,
    //   authType: 0,
    //   isEncryption: false,
    //   nsKey: 'default',
    //   password: password
    // }).then((res) => {
    const params = {
      account: userId,
      password: password
    };
    const encrypData = encryption({
      data: params,
      key: encryptionKey,
      param: ['password']
    });
    postLogin(encrypData)
      .then(async (res) => {
        if (res.code === 200) {
          const encryptPassword = encryptionString(password);
          window.localStorage.setItem('userId', userId);
          window.localStorage.setItem('password', encryptPassword);
          window.sessionStorage.setItem('token', res.data.accessToken);
          document.cookie =
            'token=' + res.data.accessToken + ';path=/;secure=true';
          // window.sessionStorage.setItem('userInfo', JSON.stringify(res.data));
          const redirectUrl = window.sessionStorage.getItem('loginRedirect');
          const userInfo = await CommonStore.getUserInfo();
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          if (redirectUrl && redirectUrl !== '/zycg/login') {
            window.location = redirectUrl + window.location.search; // 从哪里来，跳回哪里去
          } else {
            window.location = '/zycg/home'; // 跳转到工作台
          }
        } else {
          Toast.offline(res.msg, 2);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.header}>登录</div>
      <div className={`login ${style.content}`}>
        <div className={style.account}>
          <div className={style.pass}>
            <div style={{ marginBottom: '2.3rem' }}>
              <InputItem
                labelNumber={1.5}
                placeholder="请输入账号"
                value={userId}
                onChange={(e) => setUserId(e)}>
                <img src={accountPng} alt="" style={{ height: '2rem' }} />
              </InputItem>
            </div>
            <InputItem
              labelNumber={1}
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e)}>
              <img src={passIconPng} alt="" style={{ height: '1.6rem' }} />
            </InputItem>
          </div>
          <Button className={'loginBtn'} onClick={onSubmit}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
