import React from "react";
import { Link } from "react-router-dom";

import { LogoutHandler } from "../jwtTokenModules";

import "../../css/Avatar.css";

function Btns() {
    if (localStorage.getItem("id")) {
        if (localStorage.getItem("role") === "ADMIN") {
            return (
                <div className="hbtn-group">
                    <Link to="/">
                        <button
                            type="button"
                            onClick={LogoutHandler}
                            className="login-btn btn"
                        >
                            로그아웃
                        </button>
                    </Link>
                    <Link to="/adm">
                        <button
                            type="button"
                            className="btn login-btn"
                            style={{
                                width: "100%",
                                paddingRight: "5px",
                                paddingLeft: "5px",
                                marginLeft: "10px",
                                backgroundColor: "#FFB798",
                            }}
                        >
                            관리자 페이지
                        </button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="Avatar hbtn-group">
                    <Link to="/">
                        <button
                            type="button"
                            onClick={LogoutHandler}
                            className="login-btn btn"
                        >
                            로그아웃
                        </button>
                    </Link>
                    <Link to="/confirmPw" id="avatar-container">
                        <img src="img/user.png" alt="user" className="avatar" />
						<div id="btn-nickname"><strong>{localStorage.getItem("nickname")}</strong> 님</div>
                    </Link>
                </div>
            );
        }
    } else {
        return (
            <div className="hbtn-group">
                <Link className="btn login-btn" to="/login">
                    로그인
                </Link>
                <Link className="btn join-btn" to="/join">
                    회원가입
                </Link>
            </div>
        );
    }
}

export default Btns;
