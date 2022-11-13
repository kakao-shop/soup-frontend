import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import DefaultItem from './DefaultItem';
import Theme from './Theme';
import MyBestItem from './MyBestItem';

function LandingPage({isLogin, setIsLogin}) {
  console.log(isLogin)
  let location = useLocation();
  const user = location.state;
  console.log(user);
  // if (isLogin){
  //   return(
  //     <div>
  //       <AfterLoginHeader/>
  //       <Nav />
  //       <Theme />
  //       <DefaultItem />      
  //     </div>
  //   );
  // }else{
  //   return(

  //   );
  // }
  
  const users = {
    nickname: localStorage.getItem('nickname')
  }

  const list = localStorage.getItem('access_token') === null ? <DefaultItem/> : <MyBestItem/>;

  return (
    <div>
    <Header setIsLogin={setIsLogin} isLogin={isLogin}/> 
    <Nav />
    <Theme />
    {list}
 
  </div>
  );
  
}

export default LandingPage;
