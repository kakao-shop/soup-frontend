import { Link } from "react-router-dom";

import Panel from "../UI/Panel/Panel";

import classes from "./Login.module.css";

const Login = (props) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Panel>
      <h2>로그인</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <div className="form-input">
          <label htmlFor="login-id">아이디</label>
          <input
            type="text"
            value={id}
            minLength="5"
            maxLength="12"
            id="login-id"
          />
        </div>
        <div className="form-input">
          <label htmlFor="login-pw">비밀번호</label>
          <input
            type="password"
            value={pw}
            minLength="6"
            maxLength="15"
            id="login-pw"
          />
        </div>
        <button>로그인</button>
      </form>
      <Link to="/join" className={classes["join-link"]}>
        아직 회원이 아니신가요?
      </Link>
    </Panel>
  );
};

export default Login;
