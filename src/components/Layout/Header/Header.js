import Container from "../../UI/Container/Container";
import SearchInput from "./SearchInput";

import classes from "./Header.module.css";

import Logo from "../../../assets/logo.png";
import BtnGroup from "./BtnGroup";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <Container>
      <header>
        <Link to="/" className={classes.logo}>
          <img src={Logo} alt="Special On Your Price Logo" />
        </Link>
        <SearchInput />
        <BtnGroup />
      </header>
    </Container>
  );
};

export default Header;
