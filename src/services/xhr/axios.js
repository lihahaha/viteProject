import axios from 'axios';
import qs from 'qs';
// import LoginUtils, {Keys} from '@/plugins/LoginUtils';

const authenCode = [401];
// axios 终止句柄
var CancelToken = axios.CancelToken;
let cancelTokenMap = { get: {} };
/**
 * 创建xhr实例
 * 路径前缀
 * 超时失败时间
 */
const service = axios.create({
  timeout: 50000,
  async: true,
  crossDomain: true,
  withCredentials: true
});

/**
 * @desc 设置服务请求拦截器
 * 定义token请求设置
 */
service.interceptors.request.use(
  (config) => {
    config.headers['blade-auth'] = `bearer ${window.sessionStorage.getItem(
      'token'
    )}`;
    config.headers['token'] = window.sessionStorage.getItem('token');
    if (config.data && config.data.privilegeTag) {
      config.headers['privilegeTag'] = 1;
      delete config.data.privilegeTag;
    }
    if (config.params && config.params.privilegeTag) {
      config.headers['privilegeTag'] = 1;
      delete config.params.privilegeTag;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * @desc 设置服务响应拦截器
 * 截取返回状态 统一定义成功失败
 */
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    const code = data.code | 0;
    if (authenCode.includes(code)) {
      // messageInfo.show(code, 'warn', data.message)
    }
    if (data.code === 401) {
      const pathname = window.location.pathname;
      if (pathname !== '/zycg/login') {
        window.sessionStorage.setItem('loginRedirect', pathname);
      }
      window.location.href = '/#/zycg/login' + window.location.search;
    } else {
      return data;
    }
  },
  (error) => {
    if (error.response.status === 401) {
      const pathname = window.location.pathname;
      if (pathname !== '/zycg/login') {
        window.sessionStorage.setItem('loginRedirect', pathname);
      }
      window.location.href = '/#/zycg/login' + window.location.search;
    } else {
      return Promise.reject(error.response.data || error);
    }
  }
);

/**
 * 封装get请求
 * @param {*} url
 * @param {*} params
 * @param _cancelToken is boolean
 * @param otherParams object
 */
const get = (url, params = {}, _cancelToken = false, otherParams = {}) => {
  let _config = {
    url: url,
    method: 'get',
    ...otherParams
    // params
  };
  if (params.hasOwnProperty('data') && params.hasOwnProperty('json')) {
    _config['data'] = params.data;
  } else {
    _config['params'] = params;
  }
  if (_cancelToken) {
    let _key = url;
    let _arr = [];
    var entries = Object.entries(params);
    for (let [key, value] of entries) {
      _arr.push(key + '=' + value);
    }
    _key = _key + '?' + _arr.join('&');
    let _token = cancelTokenMap['get'][_key];
    if (!_token) {
      cancelTokenMap['get'][_key] = {};
      _token = cancelTokenMap['get'][_key];
    }
    _token['token'] =
      _token['token'] ||
      new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        _token['cancel'] = c;
      });
    _token['count'] = _token['count'] ? _token['count'] + 1 : 1;
    _config['cancelToken'] = _token['token'];
  }
  return service(_config).then(
    (res) => {
      return res;
    },
    (rj) => {
      return rj;
    }
  );
  // 低版本浏览器不支持promise的finally，加垫片(promise.prototype.finally)or放弃。
  // .finally(() => {
  //   if (_cancelToken) {
  //     const _item = cancelTokenMap['get'][url]
  //     if (_item && _item.count <= 1) {
  //       delete cancelTokenMap['get'][url]
  //     }
  //     _item && _item.count--
  //   }
  // });
};

const post = (url, data, config = {}) => {
  const { cancelToken, ..._config } = config;
  if (cancelToken) {
    let _token = cancelTokenMap['get'][url];
    if (!_token) {
      cancelTokenMap['get'][url] = {};
      _token = cancelTokenMap['get'][url];
    }
    _token['token'] =
      _token['token'] ||
      new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        _token['cancel'] = c;
      });
    _token['count'] = _token['count'] ? _token['count'] + 1 : 1;
    _config['cancelToken'] = _token['token'];
  }
  return service.post(url, data, _config).then(
    (res) => {
      return res;
    },
    (error) => {
      return error;
    }
  );
};

const _delete = (url, config = {}) => {
  const { cancelToken, ..._config } = config;
  if (cancelToken) {
    let _token = cancelTokenMap['get'][url];
    if (!_token) {
      cancelTokenMap['get'][url] = {};
      _token = cancelTokenMap['get'][url];
    }
    _token['token'] =
      _token['token'] ||
      new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        _token['cancel'] = c;
      });
    _token['count'] = _token['count'] ? _token['count'] + 1 : 1;
    _config['cancelToken'] = _token['token'];
  }
  return service
    .delete(url, _config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const patch = (url, config = {}) => {
  const { cancelToken, ..._config } = config;
  if (cancelToken) {
    let _token = cancelTokenMap['get'][url];
    if (!_token) {
      cancelTokenMap['get'][url] = {};
      _token = cancelTokenMap['get'][url];
    }
    _token['token'] =
      _token['token'] ||
      new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        _token['cancel'] = c;
      });
    _token['count'] = _token['count'] ? _token['count'] + 1 : 1;
    _config['cancelToken'] = _token['token'];
  }
  return service
    .patch(url, _config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//登录
const postForm = (url, data) => {
  return axios({
    url: url,
    method: 'post',
    data: qs.stringify(data)
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

// 上传媒体资源
const postMediaFormData = (url, data) => {
  return axios({
    url: url,
    method: 'post',
    data: data,
    // headers: {
    //   token: LoginUtils.getSessionStorageItem(Keys.CHANGCHUN_ACCOUNT_TOKEN)
    // },
    processData: false, // 告诉axios不要去处理发送的数据(重要参数)
    contentType: false // 告诉axios不要去设置Content-Type请求头
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      // erroInfo.show(error.response.status)
      return error.response;
    });
};

/**
 * 终止未完成的axios请求
 * @param {*} url axios请求地址
 * @param params
 * @param {*} type 方法类型 get/post or other
 */
const cancelAxiosToken = (url, params = {}, type) => {
  if (type) {
    let item = cancelTokenMap[type];
    let _key = url;
    let _arr = [];
    var entries = Object.entries(params);
    for (let [key, value] of entries) {
      _arr.push(key + '=' + value);
    }
    _key = _key + '?' + _arr.join('&');
    if (item[_key]) {
      if (typeof item[_key]['cancel'] === 'function') {
        item[_key]['cancel']();
      }
      delete cancelTokenMap[type][_key];
    }
  }
};

export {
  get,
  post,
  cancelAxiosToken,
  _delete,
  patch,
  postMediaFormData,
  postForm
};
