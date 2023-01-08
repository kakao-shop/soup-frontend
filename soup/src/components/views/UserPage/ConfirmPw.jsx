import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { reissuanceAccessToken, getCookie } from "../../jwtTokenModules";

import Header from "../Header";
import Nav from "../Nav";

function ConfirmPw({ categoryList }) {
    let navigate = useNavigate();
    const user = {
        id: localStorage.getItem("id"),
    };

    const [password, setpassword] = useState("");

    const onPasswordHandler = (e) => {
        setpassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const refreshToken = getCookie("refreshToken");
        axios
            .post(
                "/members/mypage/password-check",
                {
                    password: `${password}`,
                },
                {
                    Cookie: { refreshToken },
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    }
                }
            )
            .then(function(response) {
                if (response.status === 200) {
                    navigate("/editUserInfo", {
                        state: response.data,
                    });
                }
            })
            .catch(function(error) {
                if (error.response.data.code === 4001) {
                    alert("비밀번호가 일치하지 않습니다");
                    console.log(error);
                } else if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                }
            });
    };

    return (
        <div>
            <Header />
            <Nav categoryList={categoryList} />
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
                            type="submit"
                            className="page-btn btn"
                            onClick={onSubmitHandler}
                        >
                            비밀번호 확인
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ConfirmPw;
