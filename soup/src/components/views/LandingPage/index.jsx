import React from 'react';
import Header from '../Header';
import Nav from '../Nav';
import AfterLoginHeader from './AfterLoginHeader';
import DefaultItem from './DefaultItem';
import Theme from './Theme';

function LandingPage({isLogin, setIsLogin}) {
  console.log(isLogin)
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
