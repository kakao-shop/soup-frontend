import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../../css/LoginPage.css";

function Login() {
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const getloginId = (e) => {
        setId(e.currentTarget.value);
    };

    const getloginPw = (e) => {
        setPassword(e.currentTarget.value);
    };

    const btnLogin = (e) => {
        axios
            .post("/members/login", {
                id: `${Id}`,
                password: `${Password}`,
            })
            .then(function(response) {
                if (response.status === 200) {
                    localStorage.clear();
                    localStorage.setItem(
                        "access_token",
                        response.data.result.accessToken
                    );
                    localStorage.setItem(
                        "nickname",
                        response.data.result.nickname
                    );
                    localStorage.setItem("id", `${Id}`);
                    localStorage.setItem("role", response.data.result.role);
                    document.location.href = "/";
                    console.log(response);
                }
            })
            .catch(function(error) {
                alert("로그인에 실패했습니다. 다시 로그인을 시도해 주세요.");
                console.log(error);
            });
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
        </div>
    );
}

export default Login;
