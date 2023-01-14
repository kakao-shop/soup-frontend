import classes from "./Container.module.css";

const Container = (props) => {
  return <div className={classes.container}>123{props.children}</div>;
};

export default Container;
