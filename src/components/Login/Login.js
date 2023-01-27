import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/apis";
import { setCookie } from "../../api/cookie";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";

import Panel from "../UI/Panel/Panel";

const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginApi = (loginData) => {
    api
      .post("/members/login", loginData)
      .then((res) => {
        alert(res.data.message);

        localStorage.setItem("id", id);
        localStorage.setItem("nickname", res.data.result.nickname);
        localStorage.setItem("role", res.data.result.role);
        setCookie("accessToken", res.data.result.accessToken);
        setCookie("refreshToken", res.data.result.refreshToken);

        authCtx.onLogin();

        navigate("/");
      })
      .catch((error) => {
        alert(error.res.data.message);
      });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      id: id,
      password: password,
    };

    loginApi(loginData);
  };

  return (
    <Panel>
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleLoginFormSubmit}>
        <div className="form-input">
          <label htmlFor="login-id">아이디</label>
          <input
            type="text"
            value={id}
            onChange={handleIdChange}
            minLength="5"
            maxLength="12"
            id="login-id"
          />
        </div>
        <div className="form-input">
          <label htmlFor="login-pw">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            minLength="6"
            maxLength="15"
            id="login-pw"
          />
        </div>
        <button className="submit-btn">로그인</button>
      </form>
      <Link to="/join" className={classes["join-link"]}>
        아직 회원이 아니신가요?
      </Link>
    </Panel>
  );
};

export default Login;
