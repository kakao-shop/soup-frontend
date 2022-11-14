import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import DefaultItem from './DefaultItem';
import Theme from './Theme';


function LandingPage({isLogin, setIsLogin}) {
  console.log(isLogin)
  let location = useLocation();
  const user = location.state;
  console.log(user);
  
  const users = {
    nickname: localStorage.getItem('nickname')
  }

  // const list = localStorage.getItem('access_token') === null ? <DefaultItem/> : <MyBestItem/>;

  return (
    <div>
    <Header setIsLogin={setIsLogin} isLogin={isLogin}/> 
    <Nav />
    <Theme />
    <DefaultItem/>
 
  </div>
  );
  
}

export default LandingPage;
