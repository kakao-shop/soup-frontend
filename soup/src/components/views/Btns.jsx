import React from "react";
import { Link } from "react-router-dom";
import '../../css/Avatar.css';

function Btns({isLogin, setIsLogin}) {
  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      localStorage.removeItem('access_token')
      // App 으로 이동(새로고침)
      document.location.href = '/'
  }    
  if (isLogin){
    return(
      <div className="Avatar hbtn-group">
            <Link to="/"><button type="button" onClick={onLogout} className="login-btn btn">로그아웃</button></Link>
            <Link to="/confirmPw"><img src="img/user.png" alt="user" className="avatar" />            </Link>
      </div>
    );
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
  // return (
  //   <div className="hbtn-group">
  //       <Link className="btn login-btn" to="/login">
  //         로그인
  //       </Link>
  //       <Link className="btn join-btn" to="/join">
  //         회원가입
  //       </Link>
  //   </div>
  // );
}

export default Btns;