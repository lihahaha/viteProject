import { observable, action, runInAction } from 'mobx';
import {
  getUserInfoData,
  getDataFromNacos,
  getDataFromNacosFromioc
} from '@/services/apis/common';

class CommonStore {
  echartsMap = new Map();

  @observable position =
    JSON.parse(window.localStorage.getItem('position')) || {};

  @action getPosition = () => {
    // window.localStorage.setItem('position', '');
    let address = {};
    //百度地图
    var geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
        // let mk = new window.BMap.Marker(r.point);
        let currentLat = r.point.lat;
        let currentLon = r.point.lng;
        console.log('坐标', [currentLon, currentLat]);
        let pt = new window.BMap.Point(currentLon, currentLat);
        let geoc = new window.BMap.Geocoder();
        geoc.getLocation(pt, function (rs) {
          let addComp = rs.addressComponents;
          let str =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber;
          console.log('定位', str);
          window.localStorage.setItem(
            'position',
            JSON.stringify({
              coordinate: [currentLon, currentLat],
              address: str
            })
          );
          address = {
            coordinate: [currentLon, currentLat],
            address: str
          };
        });
      }
    });
    // this.position = address;
    // console.log(address);
  };

  @observable userInfo = {};
  @action getUserInfo = async () => {
    const res = await getUserInfoData();
    if (res && res.code === 200) {
      const resData = res.data || {};
      this.userInfo = resData;
      return resData;
    }
    return {};
  };

  @observable nacosConfig = {};
  @action setNacosConfig = (data) => {
    this.nacosConfig = data;
  };
  @action getNacosConfig = () => {
    const params = ['system.searchPOICity', 'system.searchPOIKey'];
    return getDataFromNacos(params).then((res) => {
      if (res && +res.code === 200) {
        const resData = res.data || {};
        this.nacosConfig = resData;
      }
      return res;
    });
  };

  @action getNacosConfigFromioc = () => {
    const params = ['system.searchPOICity', 'system.searchPOIKey'];
    return getDataFromNacosFromioc(params).then((res) => {
      if (res && +res.code === 200) {
        const resData = res.data || {};
        this.nacosConfig = resData;
      }
      return res;
    });
  };

  @observable personInfo = {};
  @action setPersonInfo = (data) => {
    this.personInfo = data;
  };
}

export default new CommonStore();
