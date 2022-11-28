import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function(app) {
    app.use(
        "/search",
        createProxyMiddleware({
            target: BACK_URI,
            changeOrigin: true,
        })
    );
    app.use(
        "/bot",
        createProxyMiddleware({
            target: BACK_URI,
            changeOrigin: true,
        })
    );
    app.use(
        "/admin",
        createProxyMiddleware({
            target: BACK_URI,
            changeOrigin: true,
        })
    );
    app.use(
    "/members",
        createProxyMiddleware({
            target: BACK_URI,
            changeOrigin: true,
        })
    );
}