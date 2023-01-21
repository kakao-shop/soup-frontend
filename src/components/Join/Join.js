import { useState } from "react";
import axios from "axios";

import Panel from "../UI/Panel/Panel";

import classes from "./Join.module.css";

const Join = (props) => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("M");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
    axios({
      method: "get",
      url: requestUrl,
    })
      .then((response) => {
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
      password: password,
      confirmPassword: confirmPassword,
      birthday: birthday,
      gender: gender,
      role: "USER",
      oauth: "ORIGIN",
    };

    axios({
      method: "post",
      url: "/members/signup",
      data: joinData,
    })
      .then((response) => {
        alert("회원가입 성공");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Panel>
      <h2>회원가입</h2>
      <form onSubmit={handleJoinFormSubmit}>
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
            onChange={handlePasswordChange}
            value={password}
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
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
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
        <button>회원가입</button>
      </form>
    </Panel>
  );
};

export default Join;
