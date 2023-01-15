import { Link } from "react-router-dom";
import classes from "./BtnGroup.module.css";

const BtnGroup = (props) => {
  return (
    <div className={classes["btn-group"]}>
      <Link to="/login" className={classes["left-btn"]}>
        로그인
      </Link>
      <Link to="/join" className={classes["right-btn"]}>
        회원가입
      </Link>
      {/* <button type="button" className={classes["left-btn"]}>
        장바구니
      </button>
      <button type="button" className={classes["right-btn"]}>
        로그아웃
      </button> */}
    </div>
  );
};

export default BtnGroup;
