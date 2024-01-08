import { configure } from 'mobx'; // 开启严格模式

// 这个文件不需要改动，会自动扫描module文件夹下的文件自动生成对应的store对象并注入
// 唯一需要做的是保证页面中使用的Store名称和文件名一致
const contexts = require.context('./module', false, /\.js/);
let _stores = {};

contexts.keys().forEach((key) => {
  const name = /\.\/(\S+).js$/g.exec(key);
  _stores[name[1]] = contexts(key).default;
});

configure({ enforceActions: 'always' }); // 开启严格模式

const stores = {
  ..._stores
};

export default stores;
