import { get, post, postForm } from '@/services/xhr/axios';
import {
  iocBaseUrl,
  backendBaseUrl,
  zhongyuanBaseUrl,
  eventCenterBaseUrl
} from './baseUrl';

// const GET_COMMON_URL = '/api/mock/getData';
// const GET_GOVER_DATA_URL = '/jeecg-boot/rest/screenTemp/getContent';
// const baseTransferUrl = '/api/data/gateway/transfer';

// export const getDataUrl = (data) => {
//     return get(GET_COMMON_URL,data)
// };

// export const getGoverDataUrl = (data) => {
//     return get(GET_GOVER_DATA_URL,data)
// };

// export const fetchTransferData = (data) => {
//   return post(baseTransferUrl, data);
// };

const loginApi = backendBaseUrl + '/sys/auth/getIocToken'; //登录
export const postLogin = (data) => {
  return postForm(loginApi, data);
};

const logonApi = backendBaseUrl + '/sys/user/updatePassword'; //密码修改
export const postLogon = (data) => {
  return post(logonApi, data);
};

const uploadLocApi = backendBaseUrl + '/screen/job/setLocation'; //位置信息上报
export const postUploadLoc = (data) => {
  return post(uploadLocApi, data);
};

// 获取当前登录用户信息
const getUserInfoApi = backendBaseUrl + '/sys/user/getUserInfo';
export const getUserInfoData = () => {
  return get(getUserInfoApi);
};

// 通过code获取token
const getTokenByCodeApi = backendBaseUrl + '/sys/auth/getAppToken';
export const getTokenByCode = (data) => {
  return get(getTokenByCodeApi, data);
};

// 通用获取nacos配置
const getDataFromNacosApi = backendBaseUrl + '/sys/config/getValueByKeys';
export const getDataFromNacos = (data) => {
  return post(getDataFromNacosApi, data);
};

// 通用获取nacos配置
const getDataFromNacosFromiocApi =
  backendBaseUrl + '/fromioc/sys/config/getValueByKeys';
export const getDataFromNacosFromioc = (data) => {
  return post(getDataFromNacosFromiocApi, data);
};
