import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {reissuanceAccessToken, getCookie, removeCookie} from "../../jwtTokenModules";

import Header from "../Header";
import Nav from "../Nav";
import Modal from "./Modal";

import "../../../css/UserPage.css";

function EditUserInfo({ categoryList }) {
    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const openModalHandler = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    const closeModalHandler = () => {
        setOpenModal(false);
    }

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

            if (gender === "male")
                document.getElementById("editForm").gender[0].checked = true;
            else
                document.getElementById("editForm").gender[1].checked = true;
        })
        .catch(function(error) {
            if (error.response.data.code === 4002) {
                reissuanceAccessToken(error);
            } else {
                console.log(error);
                toast.error('회원 정보를 불러올 수 없습니다. 😥', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
                setTimeout(() => navigate("/"), 1000);
            }
        });

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onEditHandler = (e) => {
        e.preventDefault();
        const refreshToken = getCookie("refreshToken");
        axios
            .patch(
                "/members/mypage",
                {
                    password: `${password}`,
                    nickname: `${nickname}`,
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
                    toast.success('비밀번호 변경이 완료되었습니다. 😊', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    document.getElementById("usercheck-pw").value = "";
                }
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.warn('비밀번호를 6~15자 이내로 입력해 주세요. 😅', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    };

    const onSecessionHandler = (e) => {
        const refreshToken = getCookie("refreshToken");
        e.preventDefault();
        axios
        .delete("/members/mypage", {
            Cookie: { refreshToken },
            headers: {
                "x-access-token": localStorage.getItem("accessToken")
            }
        })
        .then(function(response) {
            toast.success('회원 탈퇴가 완료되었습니다. 😥', {
                autoClose: 700,
                transition: Slide,
                hideProgressBar: true
            });
            setTimeout(() => {
                localStorage.removeItem("id");
                localStorage.removeItem("nickname");
                localStorage.removeItem("role");
                localStorage.removeItem("accessToken");
                removeCookie("refreshToken");
                window.location.href = "/";
            }, 1000);
        })
        .catch(function(error) {
            if (error.response.data.code === 4002) {
                reissuanceAccessToken(error);
            } else {
                toast.error('회원 탈퇴가 불가능합니다. 😥', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
                console.log(error);
            }
        });
    };

    return (
        <div>
            
            <Header />
            <Nav categoryList={categoryList} />
            <main className="EditInfo container" id="modal-parent">
                <Modal text={`정말 탈퇴하시겠습니까?`} open={openModal} yes={onSecessionHandler} no={closeModalHandler} />
                <div className="square">
                    <h2>마이페이지</h2>
                    <form action="" id="editForm">
                        <div>
                            <label htmlFor="user-id">ID</label>
                            <span id="user-id">{id}</span>
                        </div>
                        <div>
                            <label htmlFor="edit-nick">닉네임</label>
                            <span id="user-id">{nickname}</span>
                        </div>
                        <div>
                            <label htmlFor="usercheck-pw">비밀번호</label>
                            <input
                                type="password"
                                name={password}
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
                            <span id="user-id">{birth}</span>
                        </div>
                        <div>
                            <label htmlFor="gender">성별</label>
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    id="male"
                                    checked={gender === "M"}
                                    disabled
                                />
                                <label htmlFor="male">남자</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="W"
                                    id="female"
                                    checked={gender === "W"}
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
                            onClick={openModalHandler}
                        >
                            회원탈퇴
                        </button>
                    </form>
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

export default EditUserInfo;
