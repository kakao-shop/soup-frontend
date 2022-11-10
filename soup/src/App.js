// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/views/LandingPage'; 
import LoginPage from './components/views/LoginPage';
import JoinPage from './components/views/JoinPage';
import ConfirmPw from './components/views/UserPage/ConfirmPw';

import EditUserInfo from './components/views/UserPage/EditUserInfo';
import CategoryView from './components/views/Item/CategoryView';


import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/confirmPw" element={<ConfirmPw />} />
          {/* <AuthRoute version={2} exact path="/confirmPw" element={<ConfirmPw />} /> */}
          <Route path="/editUserInfo" element={<EditUserInfo />} />
          <Route path="/category" element={<CategoryView />} />
          {/* <Route exact path="*" element={<NotFound />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
