import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../../store/auth-context";
import classes from "./BtnGroup.module.css";

const BtnGroup = (props) => {
  const authCtx = useContext(AuthContext);

  const handleLogoutClick = () => {
    authCtx.onLogout();
    window.location.href = "/";
  };

  return (
    <Fragment>
      {!authCtx.isLoggedIn && (
        <div className={classes["btn-group"]}>
          <div className={classes["btn-top"]}>
            <p>로그인을 해주세요.</p>
          </div>
          <div className={classes["btn-bottom"]}>
            <Link to="/login" className={classes["btn"]}>
              로그인
            </Link>
            <Link to="/join" className={classes["btn"]}>
              회원가입
            </Link>
          </div>
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div className={classes["btn-group"]}>
          <Link to="/profile">
            <div className={classes["btn-top"]}>
              <div className={classes["avatar"]}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/user.png`}
                  alt="정보 수정 페이지 버튼"
                />
              </div>
              <div>
                <strong>{localStorage.getItem("nickname")}</strong>
                <span>님 안녕하세요.</span>
              </div>
            </div>
          </Link>
          <div className={classes["btn-bottom"]}>
            <Link to="/cart" className={classes["btn"]}>
              장바구니
            </Link>
            <button className={classes["btn"]} onClick={handleLogoutClick}>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BtnGroup;
