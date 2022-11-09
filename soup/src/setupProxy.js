const { createProxyMiddleware } = require('http-proxy-middleware');
// const MOVIE_API_ADDR = process.env.API_IP
//const BACK_URI = `http://localhost:8000`
//const BACK_URI = `http://172.18.0.3:8000`
module.exports = function(app) {

  //CORS ERROR
    app.use(
        '/members',
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        })
      );
      
    //   app.use(
    //     '/user',
    //     createProxyMiddleware({
    //       target: BACK_URI,
    //       changeOrigin: true,
    //     })
    //   );

//   app.use(
//     '/v1',
//     createProxyMiddleware({
//       target: 'https://openapi.naver.com',
//       changeOrigin: true,
//     })
//   );
};