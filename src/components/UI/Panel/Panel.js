import Container from "../Container/Container";

import classes from "./Panel.module.css";

const Panel = (props) => {
  return (
    <Container>
      <div className={classes.panel}>{props.children}</div>
    </Container>
  );
};

export default Panel;
