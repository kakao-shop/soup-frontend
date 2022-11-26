import React from 'react';

import Header from '../Header';
import Nav from '../Nav';
import Login from './Login';

import '../../../css/LoginPage.css';


function LoginPage({categoryList}) {
  if (localStorage.getItem("accessToken") === null) {
    return (
      <div>
        <Header />
        <Nav categoryList={categoryList}/>
        <Login />
      </div>
    );
  }
  else {
    window.location.href="/";
  }
}
export default LoginPage;