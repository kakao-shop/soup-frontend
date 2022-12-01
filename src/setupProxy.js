const { createProxyMiddleware } = require("http-proxy-middleware");

//const BACK_URI = `http://${process.env.SOUP_API}:8000`;
// const BACK_URI = `http://localhost:8000`;

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
         createProxyMiddleware(["/search", "/bot"], {
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
