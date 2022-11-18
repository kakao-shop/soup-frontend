const { createProxyMiddleware } = require("http-proxy-middleware");

// const SOUP_API_ADDR = process.env.API_IP;
const SOUP_API_ADDR = "localhost"
const BACK_URI = `http://${SOUP_API_ADDR}:8000`;
// const BACK_URI = `http://localhost:8000`;

module.exports = function(app) {
    //CORS ERROR
    app.use(
        "/main",
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

    app.use(
        "/search",
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
        "/ ",
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
};