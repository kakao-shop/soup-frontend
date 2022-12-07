import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <Link to="/adminPage">
                        <button
                            type="button"
                            className="btn admin-btn"
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
                    <Link to="/recentItems">
                        <div id="recentItems-btn" className="btn">최근 본 상품</div>
                    </Link>
                    <Link to="/confirmPw" id="avatar-container">
                        <img src="img/user.png" alt="user" className="avatar" />
						<div id="btn-nickname"><strong>{localStorage.getItem("nickname")}</strong> 님</div>
                    </Link>
                    <ToastContainer 
                            position= "top-right" 
                            autoClose= {700} 
                            transition= "Slide"
                            hideProgressBar 
                            closeOnClick
                            rtl={false}
                            pauseOnHover 
                            draggable= {false} />
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
                <ToastContainer 
                        position= "top-right" 
                        autoClose= {700} 
                        transition= "Slide"
                        hideProgressBar 
                        closeOnClick
                        rtl={false}
                        pauseOnHover 
                        draggable= {false} />
            </div>
        );
    }
}

export default Btns;
