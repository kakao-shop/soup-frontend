import React from "react";
import { Link, useNavigate } from "react-router-dom";

import '../../../css/Avatar.css';

export default function Avatar() {
    const navigate = useNavigate();
    const onLogout = () => {
    	// sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        localStorage.removeItem('access_token')
        // App 으로 이동(새로고침)
        document.location.href = '/'
    }    
    return (
        <div className="Avatar hbtn-group">
            <Link to="/"><button type="button" onClick={onLogout} className="login-btn btn">로그아웃</button></Link>
            <Link to="/confirmPw"><img src="img/user.png" alt="user" className="avatar" />            </Link>
        </div>
    );
};