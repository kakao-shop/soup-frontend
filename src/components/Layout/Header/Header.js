import { Link } from "react-router-dom";

import Container from "../../UI/Container/Container";
import SearchInput from "./SearchInput";
import BtnGroup from "./BtnGroup";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <Container>
        <Link to="/" className={classes.logo}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            alt="Special On Your Price Logo"
          />
        </Link>
        <SearchInput />
        <BtnGroup />
      </Container>
    </header>
  );
};

export default Header;
