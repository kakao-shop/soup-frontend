import Container from "../../UI/Container/Container";

import classes from "./Nav.module.css";

const Nav = (props) => {
  return (
    <nav>
      <Container>
        <ul className={classes["nav-ul"]}>
          <li className="nav-item">과일</li>
          <li className="nav-item">채소</li>
          <li className="nav-item">축산</li>
          <li className="nav-item">수산·건어물</li>
          <li className="nav-item">즉석식품/양념</li>
          <li className="nav-item">냉장·냉동식품</li>
          <li className="nav-item">생수/음료</li>
          <li className="nav-item">빵/과자</li>
          <li className="nav-item">쌀·잡곡</li>
        </ul>
      </Container>
    </nav>
  );
};

export default Nav;
