import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import {
    reissuanceAccessToken,
    getCookie,
    removeCookie,
} from "../../jwtTokenModules";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/UserPage.css";

function EditUserInfo({ categoryList }) {
    const [Id, setId] = useState("");
    const [Nickname, setNickname] = useState("");
    const [Password, setPassword] = useState("");
    const [Birth, setBirth] = useState("");
    const [Gender, setGender] = useState("");
    // const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail']);

    useEffect(() => {
        const refreshToken = getCookie("refreshToken");
        axios
            .get("/members/mypage", {
                Cookie: { refreshToken },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setNickname(response.data.result.nickname);
                setId(response.data.result.id);
                setBirth(response.data.result.birthday);
                setGender(response.data.result.gender);

                if (Gender === "male")
                    document.getElementById(
                        "editForm"
                    ).gender[0].checked = true;
                else
                    document.getElementById(
                        "editForm"
                    ).gender[1].checked = true;
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    alert("회원 정보를 불러올 수 없습니다.");
                    console.log(error);
                }
            });
    });

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onEditHandler = () => {
        const refreshToken = getCookie("refreshToken");
        axios
            .patch(
                "/members/mypage",
                {
                    password: `${Password}`,
                    nickname: `${Nickname}`,
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
                    alert("비밀번호 변경이 완료되었습니다.");
                    document.location.href = "/confirmPw";
                }
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    alert("비밀번호를 6~15자 이내로 입력해 주세요.");
                    console.log(error);
                }
            });
    };

    const onSecessionHandler = (e) => {
        const refreshToken = getCookie("refreshToken");
        axios
            .delete("/members/mypage", {
                Cookie: { refreshToken },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                if (response.status === 200) {
                    console.log(response);
                    localStorage.clear();
                    removeCookie("refreshToken");
                    alert("회원 탈퇴에 성공했습니다.");
                    // document.location.href = "/";
                }
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    alert("회원 탈퇴가 불가능 합니다.");
                    console.log(error);
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
                    <form action="" id="editForm">
                        <div>
                            <label htmlFor="user-id">ID</label>
                            <span id="user-id">{Id}</span>
                        </div>
                        <div>
                            <label htmlFor="edit-nick">닉네임</label>
                            <span id="user-id">{Nickname}</span>
                        </div>
                        <div>
                            <label htmlFor="usercheck-pw">비밀번호</label>
                            <input
                                type="password"
                                name={Password}
                                minLength="6"
                                maxLength="15"
                                onChange={onPasswordHandler}
                                placeholder="변경할 비밀번호 입력"
                                id="usercheck-pw"
                                className="form-label"
                            />
                        </div>
                        <div>
                            <label htmlFor="join-birth">생년월일</label>
                            <span id="user-id">{Birth}</span>
                        </div>
                        <div>
                            <label htmlFor="gender">성별</label>
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    id="male"
                                    checked={Gender === "M"}
                                    disabled
                                />
                                <label htmlFor="male">남자</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="W"
                                    id="female"
                                    checked={Gender === "W"}
                                    disabled
                                />
                                <label htmlFor="female">여자</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="page-btn btn"
                            id="edit-btn"
                            onClick={onEditHandler}
                        >
                            수정
                        </button>
                        <button
                            type="submit"
                            className="page-btn btn"
                            id="secession-btn"
                            onClick={onSecessionHandler}
                        >
                            회원탈퇴
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default EditUserInfo;
