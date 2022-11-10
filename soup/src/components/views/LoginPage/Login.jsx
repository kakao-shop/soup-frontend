import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Header from '../Header';
import Nav from '../Nav'

import '../../../css/LoginPage.css';


function Login() {

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const getloginId=(e)=>{
    setId(e.currentTarget.value);
  }

  const getloginPw=(e)=>{
    setPassword(e.currentTarget.value);
  }

  const btnLogin = (e) => {
    axios.post('/members/login', {
        id : `${Id}`,
        password : `${Password}`
    })
    .then(function (response) {
      let result = response.data;
      // const {accessToken} = response.data.result.accessToken;

      // // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      // axios.defaults.headers.common["X-ACCESS-TOKEN"] = `Bearer ${accessToken}`;

      if (response.status === 200) {
        localStorage.clear();
        localStorage.setItem('access_token', response.data.result.accessToken);
        navigate('/',
        {status: result}
        );
        alert('Login Success!')
        console.log(response);
      }
      // if(Object.keys(result).length === 0){
      //    alert('Does not exist..');
      // }else{
      //    navigate('/', 
      //    { state:result });
      // }
 }).catch(function (error) {
     alert('Fail to Login');
     console.log(error);  
 });
};
  return (
    <div>
      <main className="Login container">
        <div className="square">
          <h2>로그인</h2>
          <form action="/">
            <div>
              <label htmlFor="login-id">ID</label>
              <input type="text" value={Id} minLength="5" maxLength="12" onChange={getloginId} id="login-id" className="form-label" />  
            </div>
            <div>            
              <label htmlFor="login-pw">비밀번호</label>
              <input type="password" value={Password} minLength="6" maxLength="15" onChange={getloginPw} id="login-pw" className="form-label" />
            </div>
            <button type="submit" className="page-btn btn" onClick={btnLogin}>로그인</button>
          </form>
          <Link to="/join" id="join-link">회원가입</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;