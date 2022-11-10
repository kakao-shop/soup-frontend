import React from "react";
import { Link } from "react-router-dom";
import Btns from "./Btns";

import '../../css/Header.css';
import Avatar from "./Avatar";

function Header() {
  return (
    <header className="container">
      <Link to="/"><img className="logo" alt="logo" src="img/logo.png"/></Link>
      <div className="search">
        <input className="search-input" type="text" />
        <button type="button" className="search-btn">
          <img src="img/search.png" alt="search"/>
        </button>
      </div>
      <Btns />
      <Avatar />
    </header>
  );
}

export default Header;