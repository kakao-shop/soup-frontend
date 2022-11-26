import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
    return cookies.get(name);
};

export const removeCookie = (name) => {
    return cookies.remove(name);
};



export function reissuanceAccessToken(error) {
    const refreshToken = getCookie("refreshToken");
    if (error.response.data.message === "jwt access token이 만료되었습니다.") {
        axios
            .get("/members/refresh-token", {
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
                Cookie: { refreshToken },
            })
            .then((response) => {
                localStorage.setItem(
                    "accessToken",
                    response.data.result.accessToken
                );
                window.location.href = window.location.href;
            })
            .catch((error) => {
                if (error.response.data.message === "jwt refresh token이 만료되었습니다.") {
                    alert("세션이 만료되었습니다.");
                    LogoutHandler();
                }
            });
    }
}
export function LogoutHandler() {
    const refreshToken = getCookie("refreshToken");
    axios
        .delete("/members/logout", {
            Cookie: { refreshToken },
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        })
        .then(function(response) {
            alert("로그아웃에 성공했습니다.");
            document.location.href = "/";
            localStorage.clear();
            removeCookie("refreshToken");
        })
        .catch(function(error) {
            console.log(error);
            alert("로그아웃에 실패했습니다. 다시 시도하세요.");
        });
}
