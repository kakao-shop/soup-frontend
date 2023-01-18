const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  // app.use(
  //   createProxyMiddleware("/", {
  //     target: "http://localhost:8000",
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    createProxyMiddleware("/search", {
      // 프록시를 사용할 경로(path)
      target: "http://localhost:8000", // 프록시로 이용할 서버의 주소
      // target: process.env.REACT_APP_PROXY_URL // 주소값을 별도 파일로 활용할수도 있다.(5. 참고)
      changeOrigin: true, // 대상 서버의 구성에 따라 호스트 헤더의 변경을 해주는 옵션
    })
  );
};
