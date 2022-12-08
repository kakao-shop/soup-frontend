import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Btns from "./Btns";

import "../../css/Header.css";


function Header() {
    const navigate = useNavigate();
    const [word, setWord] = useState("");

    const searchPrd = (e) => {
        navigate("/searchResult", { state: `${word}` });
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            searchPrd();
        }
    };

    return (
        <header className="container">
            <Link to="/">
                <img
                    className="logo"
                    alt="logo"
                    src={`${process.env.PUBLIC_URL}/img/logo-wrong.png`}
                />
            </Link>
            <div className="search">
                <input
                    className="search-input"
                    type="text"
                    onKeyPress={handleOnKeyPress}
                    onChange={(e) => {
                        setWord(e.target.value);
                    }}
                />
                <button
                    type="button"
                    className="search-btn"
                    onClick={searchPrd}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/img/search.png`}
                        alt="search"
                    />
                </button>
            </div>
            <Btns />
        </header>
    );
}

export default Header;
