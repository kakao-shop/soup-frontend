import React from 'react';

import Header from '../Header';
import Nav from '../Nav';
import Login from './Login';

import '../../../css/LoginPage.css';


function LoginPage() {
  return (
    <div>
      <Header />
      <Nav />
      <Login />
    </div>
  );
}
export default LoginPage;