// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const MOVIE_API_ADDR = process.env.API_IP
const BACK_URI = `http://127.0.0.1:8000`
//const BACK_URI = `http://172.18.0.3:8080`
module.exports = function(app) {

  //CORS ERROR
    app.use(
        '/members',
        createProxyMiddleware({
          target: BACK_URI,
          changeOrigin: true,
        })
      );
      
      app.use(
        '/admin',
        createProxyMiddleware({
          target: BACK_URI,
          changeOrigin: true,
        })
      );

  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://openapi.naver.com',
      changeOrigin: true,
    })
  );
};
