import { createProxyMiddleware } from "http-proxy-middleware";

const member = `http://192.168.56.110:8002`;
const admin = `http://192.168.56.110:8001`;
const search = `http://192.168.56.110:8000`;

export default function (app) {
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
}
