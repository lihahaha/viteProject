import { get, post, postForm } from '@/services/xhr/axios';
import {
  iocBaseUrl,
  backendBaseUrl,
  zhongyuanBaseUrl,
  eventCenterBaseUrl
} from './baseUrl';

// 街道处置情况
const getStreetDataApi =
  backendBaseUrl + '/transit/net/supervise/streetDisposeRank';
export const getStreetData = (data) => {
  return get(getStreetDataApi, data);
};

// 社区处置情况
const getCommunityDataApi =
  backendBaseUrl + '/transit/net/supervise/communityDisposeRank';
export const getCommunityData = (data) => {
  return get(getCommunityDataApi, data);
};

// 网格处置情况
const getGirdDataApi =
  backendBaseUrl + '/transit/net/supervise/gridDisposeRank';
export const getGirdData = (data) => {
  return get(getGirdDataApi, data);
};

// easydata通用查询接口
const getEasyDataApi = backendBaseUrl + '/easydata/api/center';
export const getEasyData = (id, data) => {
  return post(`${getEasyDataApi}/${id}`, data);
};
