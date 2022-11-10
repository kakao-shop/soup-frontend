import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import AfterLoginHeader from './AfterLoginHeader';
import DefaultItem from './DefaultItem';
import Theme from './Theme';

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
  return (
    <div>
    <Header setIsLogin={setIsLogin} isLogin={isLogin}/> 
    <Nav />
    <Theme />
    <DefaultItem />
  </div>
  );
  
}

export default LandingPage;
