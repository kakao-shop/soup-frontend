import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/JoinPage.css";

function JoinPage({categoryList}) {
    const navigate = useNavigate();

    const [Id, setId] = useState("");
    const [IdCheck, setIdCheck] = useState(400);
    const [Nickname, setNickname] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordCheck, setPasswordCheck] = useState("");
    const [Birth, setBirth] = useState("");
    const [Gender, setGender] = useState("M");

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
        setIdCheck(400);
    };

    const onNicknameHandler = (e) => {
        setNickname(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onPasswordCheckHandler = (e) => {
        setPasswordCheck(e.currentTarget.value);
    };

    const onBirthHandler = (e) => {
        setBirth(e.currentTarget.value);
    };

    const onGenderHandler = (e) => {
        setGender(e.currentTarget.value);
    };

    const onDuplicateHandler = (e) => {
        axios
            .get("/members/id-check", {
                params: {
                    id: `${Id}`,
                },
            })
            .then(function(response) {
                toast.success('사용할 수 있는 ID 입니다. 😊', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
                setIdCheck(200);
            })
            .catch(function(error) {
                if (error.response.status === 400) {
                    toast.warn(error.response.data.message + ' 😅', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    e.target.previousSibling.value = "";
                    setIdCheck(400);
                }
                else {
                    toast.error('ID 중복확인이 불가능 합니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    };

    const onSubmitHandler = (e) => {
        if (IdCheck === 200) {
            axios
            .post("/members/signup", {
                id: `${Id}`,
                nickname: `${Nickname}`,
                password: `${Password}`,
                confirmPassword: `${PasswordCheck}`,
                birthday: `${Birth}`,
                gender: `${Gender}`,
                role: "USER",
                oauth: "ORIGIN",
            })
            .then(function(response) {
                toast.success('회원가입에 성공했습니다. 😊', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
                setTimeout(() => navigate("/"), 1000);
            })
            .catch(function(error) {
                toast.error(error.response.data.message + ' 😥', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
                console.log(error);
            });
        } else {
            toast.warn('ID 중복확인을 해주세요. 😅', {
                autoClose: 700,
                transition: Slide,
                hideProgressBar: true
            });
        }
    };

    if (localStorage.getItem("id") === null) {
        return (
            <div>
                <Header />
                <Nav categoryList={categoryList} />
                <main className="Join container">
                    <div className="square">
                        <h2>회원가입</h2>
                        <form action="/">
                            <div>
                                <label htmlFor="join-id">ID</label>
                                <input
                                    type="text"
                                    value={Id}
                                    minLength="5"
                                    maxLength="12"
                                    onChange={onIdHandler}
                                    id="join-id"
                                    placeholder="ID 입력 (5~12자)"
                                />
                                <button
                                    type="button"
                                    onClick={onDuplicateHandler}
                                    className="btn id-check"
                                >
                                    중복확인
                                </button>
                            </div>
                            <div>
                                <label htmlFor="join-nickname">닉네임</label>
                                <input
                                    type="text"
                                    value={Nickname}
                                    minLength="2"
                                    maxLength="10"
                                    onChange={onNicknameHandler}
                                    id="join-nickname"
                                    placeholder="닉네임 입력 (2~10자)"
                                />
                            </div>
                            <div>
                                <label htmlFor="join-pw">비밀번호</label>
                                <input
                                    type="password"
                                    value={Password}
                                    minLength="6"
                                    maxLength="15"
                                    onChange={onPasswordHandler}
                                    id="join-pw"
                                    placeholder="비밀번호 입력 (6~15자)"
                                />
                            </div>
                            <div>
                                <label htmlFor="join-pwcheck">비밀번호 확인</label>
                                <input
                                    type="password"
                                    value={PasswordCheck}
                                    minLength="6"
                                    maxLength="15"
                                    onChange={onPasswordCheckHandler}
                                    id="join-pwcheck"
                                    placeholder="비밀번호 재입력"
                                />
                            </div>
                            <div>
                                <label htmlFor="join-birth">생년월일</label>
                                <input
                                    type="text"
                                    value={Birth}
                                    onChange={onBirthHandler}
                                    id="join-birth"
                                    minLength="8"
                                    maxLength="8"
                                    placeholder="ex) 19910101"
                                />
                            </div>
                            <div>
                                <label htmlFor="">성별</label>
                                <div>
                                    <input
                                        type="radio"
                                        value="M"
                                        onChange={onGenderHandler}
                                        id="male"
                                        checked={Gender === "M"}
                                    />
                                    <label htmlFor="male">남자</label>
                                    <input
                                        type="radio"
                                        value="W"
                                        onChange={onGenderHandler}
                                        id="female"
                                        checked={Gender === "W"}
                                    />
                                    <label htmlFor="female">여자</label>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onSubmitHandler}
                                className="page-btn btn"
                            >
                                회원가입
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
    else {
        window.location.href="/";
    }
}

export default JoinPage;
