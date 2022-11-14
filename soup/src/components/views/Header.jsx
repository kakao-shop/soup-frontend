import React from "react";
import { Link,  Navigate, useParams, useNavigate} from "react-router-dom";
import Btns from "./Btns";
import axios from "axios";

import '../../css/Header.css';
import { useState } from "react";


function Header({isLogin, setIsLogin}) {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [size, setsize] = useState("10");
  const [sort, setsort] = useState("price,desc");
  const [page, setpage] = useState("1");

  const searchPrd = (e) => {
    navigate('/searchResult', {state: `${word}`});
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPrd();
    }
  };

  return (
    <header className="container">
      <Link to="/"><img className="logo" alt="logo" src="img/logo.png"/></Link>
      <div className="search">
        <input className="search-input" type="text" onKeyPress={handleOnKeyPress} onChange={(e) => { 
          setWord(e.target.value);}}/>
        <button type="button" className="search-btn"  onClick={searchPrd}>
          <img src="img/search.png" alt="search"/>
        </button>
      </div>
      <Btns isLogin={isLogin} setIsLogin={setIsLogin} />
    </header>
  );
}

export default Header;