import Container from "../../UI/Container/Container";
import SearchInput from "./SearchInput";

import classes from "./Header.module.css";

import Logo from "../../../assets/logo.png";

const Header = (props) => {
  return (
    <Container>
      <header>
        <a href="/" className={classes.logo}>
          <img src={Logo} alt="Special On Your Price Logo" />
        </a>
        <div>
          <SearchInput />
        </div>
        <div className={classes["btn-group"]}>
          <button type="button" className={classes["login-btn"]}>
            로그인
          </button>
          <button type="button" className={classes["join-btn"]}>
            회원가입
          </button>
        </div>
      </header>
    </Container>
  );
};

export default Header;
