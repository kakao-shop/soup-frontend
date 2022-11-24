import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../Header";
import Nav from "../Nav";

function ConfirmPw({ isLogin, setIsLogin }) {
    let navigate = useNavigate();
    const user = {
        id: localStorage.getItem("id"),
    };

    const [password, setpassword] = useState("");

    const onPasswordHandler = (e) => {
        setpassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        axios
            .post(
                "/members/mypage/password-check",
                {
                    password: `${password}`,
                },
                {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken"),
                    },
                }
            )
            .then(function(response) {
                console.log(response);
                if (response.status === 200) {
                    console.log(response);
                    navigate("/editUserInfo", {
                        state: response.data,
                    });
                }
                // App 으로 이동(새로고침)
                // document.location.href = '/'
            })
            .catch(function(error) {
                alert("비밀번호가 일치하지 않습니다");
                console.log(error);
            });
    };

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin} />
            <Nav />
            <div>
                <main className="ConfirmPw container">
                    <div className="square">
                        <h2>마이페이지</h2>
                        <form action="">
                            <div>
                                <label htmlFor="user-id">ID</label>
                                <span id="user-id">{user.id}</span>
                            </div>
                            <div>
                                <label htmlFor="usercheck-pw">비밀번호</label>
                                <input
                                    type="password"
                                    value={password}
                                    minLength="6"
                                    maxLength="15"
                                    onChange={onPasswordHandler}
                                    id="usercheck-pw"
                                    className="form-label"
                                    placeholder="비밀번호 "
                                />
                            </div>

                            <button
                                type="button"
                                className="page-btn btn"
                                onClick={onSubmitHandler}
                            >
                                비밀번호 확인
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ConfirmPw;
