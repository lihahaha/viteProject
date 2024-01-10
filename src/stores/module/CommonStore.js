import { makeAutoObservable, action, toJS, runInAction } from 'mobx';
import * as API from '@/services/apis/common';

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  isModalVisible = false;
}

export default new CommonStore();
