import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routers, loginRoute } from '@/router';
import stores from '@/stores';
import { Provider } from 'mobx-react';
import { Toast } from 'antd-mobile';
import '@/assets/less/font.less';
import {
  getUrlSearchValueByName,
  decryptionString,
  getUrlParams
} from '@/utils';
import { gisAccessKey } from '@/utils/constant';
import { getTokenByCode } from '@/services/apis/common';
import { decode, encode } from 'js-base64';
import qs from 'qs';

function App() {
  const [token, setToken] = useState(''); // 本地登录后获取token
  const [code, setCode] = useState(''); // 通过第三方跳转方式获取到的code，通过接口在获取token
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 接口判断，有无页面权限

  document.cookie = 'yunli-gis-token=' + gisAccessKey + ';path=/';
  useEffect(() => {
    const code = getUrlSearchValueByName('code');
    console.log('code', code);
    const pathname = window.location.pathname;
    let _token = '1' || window.sessionStorage.getItem('token');

    if (!!code && !_token) {
      // 嵌入APP页面
      let deCode = code;
      getTokenByCode({ code: deCode, uri: window.location.pathname }).then(
        async (res) => {
          if (res && +res.code === 200) {
            window.sessionStorage.setItem('token', res.data || '');
            const data = await stores.CommonStore.getUserInfo();
            window.sessionStorage.setItem('userInfo', JSON.stringify(data));
            setToken(res?.data || '');
          } else {
            window.location.href = '/#/zycg/login';
          }
        }
      );
    } else {
      // 本地页面登录
      if (!_token && pathname.indexOf('login') === -1) {
        Toast.fail('未登录，请先登录！', 1);
        window.sessionStorage.setItem('loginRedirect', pathname);
        window.location.href = '/#/zycg/login' + window.location.search;
        return;
      } else if (_token && pathname.indexOf('login') !== -1) {
        window.sessionStorage.setItem('token', '');
      }
      setToken(window.sessionStorage.getItem('token'));
    }
  }, []);

  return (
    <Provider {...stores}>
      <HashRouter>
        <Routes>
          {routers.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                isAuthenticated ? (
                  route.component
                ) : (
                  <Navigate to="/UnauthorizedAccess" />
                )
              }
            />
          ))}
          <Route path={loginRoute.path} element={loginRoute.component} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
