import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

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