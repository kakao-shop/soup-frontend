import React from 'react';
import AfterLoginHeader from '../LandingPage/AfterLoginHeader';
import Nav from '../Nav';
import DefaultItem from '../LandingPage/DefaultItem';
import Theme from '../LandingPage/Theme';

function AfterLoginPage() {
  return (
    <div>
      <AfterLoginHeader />
      <Nav />
      <Theme />
      <DefaultItem />
    </div>
  );
}

export default AfterLoginPage;