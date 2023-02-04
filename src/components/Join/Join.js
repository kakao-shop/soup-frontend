import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/auth";

import Panel from "../UI/Panel/Panel";

import classes from "./Join.module.css";

const Join = (props) => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("M");

    const handleIdChange = (e) => {
        setId(e.target.value);
    };
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };
    const handlePwChange = (e) => {
        setPw(e.target.value);
    };
    const handleConfirmPwChange = (e) => {
        setConfirmPw(e.target.value);
    };
    const handleBirthdayChange = (e) => {
        setBirthday(e.target.value);
    };
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleDuplBtnClick = (e) => {
        e.preventDefault();

        const requestUrl = `/members/id-check?id=${id}`;
        api.get(requestUrl)
            .then((res) => {
                alert("사용할 수 있는 ID 입니다.");
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    const handleJoinFormSubmit = (e) => {
        e.preventDefault();

        const joinData = {
            id: id,
            nickname: nickname,
            password: pw,
            confirmPassword: confirmPw,
            birthday: birthday,
            gender: gender,
            role: "USER",
            oauth: "ORIGIN",
        };

        api.post("/members/signup", joinData)
            .then((res) => {
                alert("회원가입 성공");
                navigate("/");
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    return (
        <Panel>
            <h2>회원가입</h2>
            <form className="join-form" onSubmit={handleJoinFormSubmit}>
                <div className="form-input">
                    <label>아이디</label>
                    <div className={classes["join-id"]}>
                        <input
                            id="join-id"
                            type="text"
                            minLength="5"
                            maxLength="12"
                            placeholder="ID 입력 (5~12자)"
                            onChange={handleIdChange}
                            value={id}
                        />
                        <button
                            className={classes["dupl-btn"]}
                            onClick={handleDuplBtnClick}
                        >
                            중복확인
                        </button>
                    </div>
                </div>
                <div className="form-input">
                    <label>닉네임</label>
                    <input
                        type="text"
                        minLength="2"
                        maxLength="10"
                        id="join-nickname"
                        placeholder="닉네임 입력 (2~10자)"
                        onChange={handleNicknameChange}
                        value={nickname}
                    />
                </div>
                <div className="form-input">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        minLength="6"
                        maxLength="15"
                        id="join-pw"
                        placeholder="비밀번호 입력 (6~15자)"
                        onChange={handlePwChange}
                        value={pw}
                    />
                </div>
                <div className="form-input">
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        minLength="6"
                        maxLength="15"
                        id="join-pwcheck"
                        placeholder="비밀번호 재입력"
                        onChange={handleConfirmPwChange}
                        value={confirmPw}
                    />
                </div>
                <div className="form-input">
                    <label>생년월일</label>
                    <input
                        type="text"
                        id="join-birth"
                        minLength="8"
                        maxLength="8"
                        placeholder="ex) 19910101"
                        onChange={handleBirthdayChange}
                        value={birthday}
                    />
                </div>
                <div className="form-input">
                    <label>성별</label>
                    <div className={classes["join-gender"]}>
                        <input
                            type="radio"
                            onChange={handleGenderChange}
                            value="M"
                            id="male"
                            checked={gender === "M"}
                        />
                        <label>남</label>
                    </div>
                    <div className={classes["join-gender"]}>
                        <input
                            type="radio"
                            onChange={handleGenderChange}
                            value="W"
                            id="female"
                            checked={gender === "W"}
                        />
                        <label>여</label>
                    </div>
                </div>
                <button className="submit-btn">회원가입</button>
            </form>
        </Panel>
    );
};

export default Join;
