import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apis";

import Panel from "../UI/Panel/Panel";

const PwCheck = (props) => {
  const id = localStorage.getItem("id");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handlePwCheck = (e) => {
    e.preventDefault();

    const pwInput = { password: pw };

    api
      .post("/members/mypage/password-check", pwInput)
      .then((res) => {
        props.onCheckPw(true);
      })
      .catch((error) => {
        alert(error.response.data.message);
        props.onCheckPw(false);
      });
  };

  return (
    <Panel>
      <h2>비밀번호 확인</h2>
      <form className="login-form" onSubmit={handlePwCheck}>
        <div className="form-input">
          <label htmlFor="login-id">아이디</label>
          <span>{id}</span>
        </div>
        <div className="form-input">
          <label htmlFor="login-pw">비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={handlePwChange}
            minLength="6"
            maxLength="15"
            id="login-pw"
          />
        </div>
        <button className="submit-btn" onClick={handlePwCheck}>
          비밀번호 확인
        </button>
      </form>
    </Panel>
  );
};

export default PwCheck;
