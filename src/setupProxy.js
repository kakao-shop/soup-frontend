const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/search", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/bot", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/admin", {
      target: "http://localhost:8001",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/members", {
      target: "http://localhost:8002",
      changeOrigin: true,
    })
  );
};
