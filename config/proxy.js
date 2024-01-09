const proxy = require('http-proxy-middleware');

function _proxy(app) {
  const host = 'http://172.30.1.151:31496'; // 我们自己的后台网关
  const hostGis = 'http://172.30.1.151:31019'; // gis
  const hostIoc = 'http://172.30.1.151:31666'; // IOC的接口
  app.use('/gis/', proxy({ target: hostGis, changeOrigin: true }));
  app.use('/api/gis/', proxy({ target: hostGis, changeOrigin: true }));
  app.use(
    '/api/',
    proxy({
      target: hostIoc,
      changeOrigin: true
    })
  );
}

module.exports = _proxy;
