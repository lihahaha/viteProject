import ReactDOM from 'react-dom';
import * as CryptoJS from 'crypto-js';
import { encryptionKey, regionLayerCode } from './constant';

export const convertElementToDomString = (element) => {
  const newDom = document.createElement('div');
  ReactDOM.render(element, newDom);
  return newDom;
};

/**
 * 数字格式化为千分位展示
 * @param num
 * @return {string}
 */
export const formatThousandNumber = (num) => {
  return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
};

/**
 * 对象转url参数
 * @param {*} data
 * @param {*} isPrefix
 */
export const queryParams = (data, isPrefix) => {
  isPrefix = isPrefix ? isPrefix : false;
  let prefix = isPrefix ? '?' : '';
  let _result = [];
  for (let key in data) {
    let value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue;
    }
    if (value.constructor === Array) {
      value.forEach((_value) => {
        _result.push(
          encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
        );
      });
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return _result.length ? prefix + _result.join('&') : '';
};

/**
 *加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === 'Base64') {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach((ele) => {
      var data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};

export const encryptionString = (data) => {
  const key = CryptoJS.enc.Utf8.parse(encryptionKey);
  let srcs = CryptoJS.enc.Utf8.parse(data);
  // 加密
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
};

export const decryptionString = (data) => {
  const key = CryptoJS.enc.Latin1.parse(encryptionKey);

  var encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  // 解密
  var decrypted = CryptoJS.AES.decrypt(srcs, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

/**
 *获取URL指定参数对应的值
 */
export const getUrlSearchValueByName = (name) => {
  var query = window.location.search.slice(1);
  var params = query.split('&');
  var len = params.length;
  for (var i = 0; i < len; i++) {
    if (params[i].startsWith('code=')) {
      return params[i].slice(5);
    } else {
      var entry = params[i].split('=');
      if (entry[0] === name) {
        return decodeURI(entry[1]);
      }
    }
  }
  return '';
};

// 截流
export const debounce = (fn, delay) => {
  let timer = null;
  return () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(fn, delay);
  };
};

export const getUrlParams = (name, searchStr) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); //定义正则表达式
  const index = window.location.href.lastIndexOf('?');
  const str = window.location.href.substring(
    index + 1,
    window.location.href.length
  );
  // let search = searchStr || window.location.search || window.location.href.split('?')[1] || ''
  let search = searchStr || window.location.search || str || '';
  if (/^\?/.test(search)) {
    search = search.substr(1);
  }
  const r = search.match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 根据用户所属网格过滤区域网格树
 */
export const filterRegionTreeByCode = (treeData, codes) => {
  const filterTree = (nodes, query) => {
    let newChildren = [];
    nodes.forEach((node) => {
      let newNode = { ...node };
      if (query.includes(node.code)) {
        newChildren.push(newNode);
      } else if (node.children) {
        const subs = filterTree(node.children, query);
        if (subs && subs.length) {
          newNode.children = subs;
          newNode.selectable = false;
          newChildren.push(newNode);
        }
      }
    });
    return newChildren.length ? newChildren : [];
  };
  const newData = filterTree(treeData, codes);
  return newData;
};

// 根据行政区域筛选点位
export const filterLegendMonitorData = (dataItem, callbackFuc) => {
  try {
    window.YunliMap.queryDataInLayer({
      layerCode: regionLayerCode,
      returnGeometry: true // 是否返回矢量数据
    }).then((features) => {
      const newFeatures = features.filter((it) => {
        return +it.properties.level === 2 || +it.properties.level === 0;
      });
      const filterDataList = [];
      const filterAdcode = [];
      newFeatures.forEach((feature) => {
        const coordinates = feature.coordinates.flat() || [];
        coordinates.forEach((coordinate) => {
          const isPointInPolygon =
            window.YunliMap.GeometryUtil.isPointInsidePolygon(
              dataItem.coordinate,
              coordinate
            );
          if (
            isPointInPolygon &&
            !filterAdcode.includes(feature.properties.adcode)
          ) {
            filterDataList.push(feature);
            filterAdcode.push(feature.properties.adcode);
          }
        });
      });
      callbackFuc(filterDataList);
    });
  } catch (e) {}
};
