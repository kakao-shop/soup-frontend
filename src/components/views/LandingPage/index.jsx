import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../Header';
import Nav from '../Nav';
import DefaultItem from './DefaultItem';
import Theme from './Theme';
import ThemeResult from './ThemeResult';
import Bot from '../Bot/Bot';

function LandingPage({categoryList}) {

  let location = useLocation();
  const itemIdx = location.state;
  
  return (
    <div>
    <Header /> 
    <Nav categoryList={categoryList}/>
    <Theme />
    <Bot />
    {itemIdx === null
    ? <DefaultItem />
    : <ThemeResult idx = {itemIdx}/>
    }
   
 
  </div>
  );
  
}

export default LandingPage;
