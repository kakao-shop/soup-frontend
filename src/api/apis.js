import axios from "axios";
import { getCookie, setCookie } from "./cookie";

const api = axios.create();

api.interceptors.request.use(
  function (config) {
    // 요청 전 수행
    const cookies = {
      accessToken: getCookie("accessToken"),
      refreshToken: getCookie("refreshToken"),
    };

    if (!cookies) {
      config.headers["x-access-token"] = null;
      config.headers["Cookies"] = null;
      return config;
    }
    if (cookies) {
      config.headers["x-access-token"] = cookies["accessToken"];
      config.headers["Cookies"] = cookies["refreshToken"];
      console.log(config);
      return config;
    }
    console.log("request start", config);
    return config;
  },
  function (error) {
    // 오류 요청 전 수행
    console.log("request error", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    // 응답을 받기 전 수행
    console.log(response);
    return response;
  },
  function (error) {
    // 오류 응답 처리
    console.log(error);
    return Promise.reject(error);
  }
);

const refresh = () => {
  api
    .get("/members/refresh-token")
    .then((res) => {
      setCookie("accessToken", res.data.result.accessToken);
      setCookie("refreshToken", res.data.result.refreshToken);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default api;
