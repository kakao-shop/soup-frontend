import React from 'react';
import Avatar from '../Avatar';
import Header from '../Header';
import Nav from '../Nav';
import DefaultItem from './DefaultItem';
import Theme from './Theme';

function LandingPage() {
  return (
    <div>
      <Header />
      <Nav />
      <Theme />
      <DefaultItem />
    </div>
  );
}

export default LandingPage;
