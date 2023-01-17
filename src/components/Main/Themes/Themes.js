import { Fragment } from "react";
import Banner from "./Banner";
import ThemeList from "./ThemeList";

const Themes = (props) => {
  return (
    <Fragment>
      <Banner />
      <ThemeList />
    </Fragment>
  );
};

export default Themes;
