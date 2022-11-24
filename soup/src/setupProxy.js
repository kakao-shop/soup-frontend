const { createProxyMiddleware } = require("http-proxy-middleware");

// const SOUP_API_ADDR = process.env.API_IP;
// const SOUP_API_ADDR = "127.0.0.1";
const member = `http://${process.env.MEMBER_URI}`;
const admin = `http://${process.env.ADMIN_URI}`;
const search = `http://${process.env.SEARCH_URI}`;

module.exports = function(app) {

    app.use(
        "/members",
        createProxyMiddleware({
            target: member,
            changeOrigin: true,
        })
    );

    app.use(
        "/bot",
        createProxyMiddleware({
            target: search,
            changeOrigin: true,
        })
    );

    app.use(
        "/search",
        createProxyMiddleware({
            target: search,
            changeOrigin: true,
        })
    );
    app.use(
        "/admin",
        createProxyMiddleware({
            target: admin,
            changeOrigin: true,
        })
    );
};