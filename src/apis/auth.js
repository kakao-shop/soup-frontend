import axios from "axios";
import { useContext } from "react";
import { getCookie, setCookie } from "./cookie";

import { AuthContextProvider } from "../store/auth-context";

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
            return config;
        }
        if (cookies) {
            config.headers["x-access-token"] = cookies["accessToken"];
            return config;
        }
        return config;
    },
    function (error) {
        // 오류 요청 전 수행

        console.log("1", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        // 응답을 받기 전 수행
        return response;
    },
    async function (error) {
        // 오류 응답 처리
        const { config, response } = error;
        if (response.status !== 400) {
            return Promise.reject(error);
        } else if (response.data.code === 4002) {
            if (
                response.data.message === "jwt access token이 만료되었습니다."
            ) {
                console.log(getCookie("accessToken"));
                const reget = await refresh();
                const accessToken = await getCookie("accessToken");
                console.log(accessToken);

                return api(config);
            } else if (
                response.data.message === "jwt refresh token이 만료되었습니다."
            ) {
                console.log("로그아웃");
                AuthContextProvider.handleLogout();
                window.location.href = "/";
            }
        }

        console.log("해결 안됨 왜???", error);
        return api(config);
    }
);

const refresh = async () => {
    await api
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
