import React from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";
import Btns from "./Btns";
import axios from "axios";

import '../../css/Header.css';
import { useState } from "react";


function Header({isLogin, setIsLogin}) {
  const [word, setWord] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [size, setsize] = useState("10");
  const [sort, setsort] = useState("price,desc");
  const [page, setpage] = useState("1");

  const searchPrd = (e) => {
    const cat = e.target.innerText;
    axios.get('/search', {
        params: {
          q: `${word}`,
          size: `${size}`,
          sort: `${sort}`,
          page: `${page}`
        },
        headers: {
          'x-access-token': localStorage.getItem('access_token')
        }
  }).then(function (response) {
    console.log(response.data)
  }).catch(function (error) {
      alert('error');
      console.log(error);  
  });
  };

  return (
    <header className="container">
      <Link to="/"><img className="logo" alt="logo" src="img/logo.png"/></Link>
      <div className="search">
        <input className="search-input" type="text" onChange={(e) => { 
          setWord(e.target.value); console.log(word);}}/>
        <button type="button" className="search-btn" onClick={searchPrd}>
          <img src="img/search.png" alt="search"/>
        </button>
      </div>
      <Btns isLogin={isLogin} setIsLogin={setIsLogin} />
    </header>
  );
}

export default Header;