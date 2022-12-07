import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setCookie, removeCookie } from "../../jwtTokenModules";

import "../../../css/LoginPage.css";

function Login() {

    const navigate = useNavigate();
    const showToastMessage = () => {
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };


    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const getloginId = (e) => {
        setId(e.currentTarget.value);
    };

    const getloginPw = (e) => {
        setPassword(e.currentTarget.value);
    };

    const btnLogin = (e) => {
        if (Id) {
            if (Password) {
                axios
                .post("/members/login", {
                    id: `${Id}`,
                    password: `${Password}`,
                })
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.clear();
                        removeCookie();
                        setCookie('refreshToken', response.data.result.refreshToken, {
                            path: "/"
                        });
                        localStorage.setItem("accessToken", response.data.result.accessToken);
                        localStorage.setItem("nickname", response.data.result.nickname);
                        localStorage.setItem("id", `${Id}`);
                        localStorage.setItem("role", response.data.result.role);
                        toast.success('로그인에 성공했습니다. 😀', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        })
                        setTimeout(() => { window.location.href="/"; }, 1000);
                    }
                })
                .catch((error) => {
                    toast.error('해당 유저가 존재하지 않거나 비밀번호가 틀립니다. 😢', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                        });
                    console.log(error);
                });
            } else {
                toast.warn('비밀번호를 입력하세요. 🙂', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                    });
            }
        } else {
            toast.warn('ID를 입력하세요. 🙂', {
                autoClose: 700,
                transition: Slide,
                hideProgressBar: true
            });
        }
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            btnLogin();
        }
    };

    return (
        <div>
            <main className="Login container">
                <div className="square">
                    <h2>로그인</h2>
                    <form action="/">
                        <div>
                            <label htmlFor="login-id">ID</label>
                            <input
                                type="text"
                                value={Id}
                                minLength="5"
                                maxLength="12"
                                onChange={getloginId}
                                id="login-id"
                                className="form-label"
                            />
                        </div>
                        <div>
                            <label htmlFor="login-pw">비밀번호</label>
                            <input
                                type="password"
                                value={Password}
                                minLength="6"
                                maxLength="15"
                                onChange={getloginPw}
                                onKeyPress={handleOnKeyPress}
                                id="login-pw"
                                className="form-label"
                            />
                        </div>
                        <button
                            type="button"
                            className="page-btn btn"
                            onClick={btnLogin}
                        >
                            로그인
                        </button>
                    </form>
                    <Link to="/join" id="join-link">
                        회원가입
                    </Link>
                </div>
            </main>
            <ToastContainer 
                    position= "top-right" 
                    autoClose= {700} 
                    transition= "Slide"
                    hideProgressBar 
                    closeOnClick
                    rtl={false}
                    pauseOnHover 
                    draggable= {false} />
        </div>
    );
}

export default Login;
