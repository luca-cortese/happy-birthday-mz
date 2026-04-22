const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/validate',
    createProxyMiddleware({
      target: 'https://n7euq00ck2.execute-api.eu-central-1.amazonaws.com/PROD',
      changeOrigin: true,
    })
  );
};
