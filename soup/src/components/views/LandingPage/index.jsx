import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import DefaultItem from './DefaultItem';
import Theme from './Theme';
import ThemeResult from './ThemeResult';
import Bot from '../../Bot/Bot';

function LandingPage({isLogin, setIsLogin}) {

  let location = useLocation();
  const itemIdx = location.state;
  
  const users = {
    nickname: localStorage.getItem('nickname')
  }

  // const list = localStorage.getItem('access_token') === null ? <DefaultItem/> : <MyBestItem/>;

  return (
    <div>
    <Header setIsLogin={setIsLogin} isLogin={isLogin}/> 
    <Nav />
    <Theme />
    <Bot/>
    {itemIdx === null
    ? <DefaultItem/>
    : <ThemeResult idx = {itemIdx}/>
    }
   
 
  </div>
  );
  
}

export default LandingPage;
