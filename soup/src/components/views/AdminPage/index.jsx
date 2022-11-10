import React from "react";
import { Link } from "react-router-dom";
import Admin from "./Admin";
import NotFound from ""

function Btns({isLogin, setIsLogin}) {
  if (isLogin){
    return(
      <Admin />
    );
  }else{
    return(
        <NotFound />
    )
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