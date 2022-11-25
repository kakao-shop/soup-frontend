const { createProxyMiddleware } = require("http-proxy-middleware");

// const SOUP_API_ADDR = process.env.API_IP;
// // const SOUP_API_ADDR = "localhost";
// const BACK_URI = `http://${SOUP_API_ADDR}:8000`;

// module.exports = function(app) {

//     app.use(
//         "/members",
//         createProxyMiddleware({
//             target: BACK_URI,
//             changeOrigin: true,
//         })
//     );

//     app.use(
//         "/admin",
//         createProxyMiddleware({
//             target: BACK_URI,
//             changeOrigin: true,
//         })
//     );

//     app.use(
//         "/search",
//         createProxyMiddleware({
//             target: BACK_URI,
//             changeOrigin: true,
//         })
//     );


//     app.use(
//         "/bot",
//         createProxyMiddleware({
//             target: BACK_URI,
//             changeOrigin: true,
//         })
//     );
// };

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