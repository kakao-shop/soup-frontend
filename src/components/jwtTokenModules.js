import axios from "axios";
import { Cookies } from "react-cookie";
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                Cookie: { refreshToken }
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
                    toast.error('세션이 만료되었습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    setTimeout(LogoutHandler(), 1000);
                }
            });
    }  else {
        toast.error('비정상적인 접근입니다. 😥', {
            autoClose: 700,
            transition: Slide,
            hideProgressBar: true
        });
        
        setTimeout(LogoutHandler(), 1000);
        
    }
}
export function LogoutHandler(msg='로그아웃에 성공했습니다. 😀') {
    const refreshToken = getCookie("refreshToken");
    axios
        .delete("/members/logout", {
            Cookie: { refreshToken },
            headers: {
                "x-access-token": localStorage.getItem("accessToken")
            }
        })
        .then(function(response) {
            toast.success(msg, {
                autoClose: 700,
                transition: Slide,
                hideProgressBar: true
            });
            window.location.href="/";
            localStorage.clear();
            removeCookie("refreshToken");
        })
        .catch(function(error) {
            localStorage.removeItem("id");
            localStorage.removeItem("nickname");
            localStorage.removeItem("role");
            localStorage.removeItem("accessToken");
            removeCookie("refreshToken");
            window.location.href = "/";
        });
}
