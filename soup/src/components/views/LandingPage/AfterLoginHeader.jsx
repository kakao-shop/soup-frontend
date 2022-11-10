import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";

function AfterLoginHeader() {

  return (
    <header className="container">
      <Link to="/"><img className="logo" alt="logo" src="img/logo.png"/></Link>
      <div className="search">
        <input className="search-input" type="text" />
        <button type="button" className="search-btn">
          <img src="img/search.png" alt="search"/>
        </button>
      </div>
      <Avatar />
    </header>
  );
}

export default AfterLoginHeader;