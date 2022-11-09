import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Header from '../Header';
import Nav from '../Nav';
import Login from './Login';

import '../../../css/LoginPage.css';


function LoginPage() {

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const getloginId=(e)=>{
    setId(e.target.value);
  }

  const getloginPw=(e)=>{
    setPassword(e.target.value);
  }

  const btnLogin = () => {
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
        { status: result }
        )
        alert('Login Success!')
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
}
  return (
    <div>
      <Header />
      <Nav />
      <Login />
    </div>
  );
}

export default LoginPage;