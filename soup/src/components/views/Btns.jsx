import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import '../../css/Avatar.css';

function Btns({isLogin, setIsLogin}) {
  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      axios.delete('/members/logout',)
      .then(function (response) {
        console.log(response)

        localStorage.removeItem('access_token')
        localStorage.removeItem('id')
        localStorage.removeItem('nickname')
        // App 으로 이동(새로고침)
        document.location.href = '/'
      }).catch(function (error) {
        alert('Fail to Logout');
        console.log(error);  
    });
  }    
  if (isLogin){
    if (localStorage.getItem('id') === "admin") {
      return (
        <div className="hbtn-group">
            <Link to="/"><button type="button" onClick={onLogout} className="login-btn btn">로그아웃</button></Link>
            <Link to="/admin"><button type="button" className="btn login-btn" style={{width: "100%", paddingRight: "5px", paddingLeft: "5px", marginLeft: "10px", backgroundColor: "#FFB798"}}>관리자 페이지</button></Link>
      </div>
      )
    }
    else{
    return(
      <div className="Avatar hbtn-group">
            <Link to="/"><button type="button" onClick={onLogout} className="login-btn btn">로그아웃</button></Link>
            <Link to="/confirmPw"><img src="img/user.png" alt="user" className="avatar" /></Link>
      </div>
    );
    }
  }else{
    return(
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