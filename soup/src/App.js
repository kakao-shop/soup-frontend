// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/views/LandingPage'; 
import LoginPage from './components/views/LoginPage';
import JoinPage from './components/views/JoinPage';
import ConfirmPw from './components/views/UserPage/ConfirmPw';
import EditUserInfo from './components/views/UserPage/EditUserInfo';
import CategoryView from './components/views/Item/CategoryView';


import './App.css';
import { useEffect } from "react";
import React, { useState } from 'react';
import NotFound from "./components/views/NotFound";

function App() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('access_token') === null){
      console.log('isLogin ?? ::', isLogin)
    }else{
      setIsLogin(true)
      console.log('isLogin ?? ::',isLogin)
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path="/confirmPw" element={<ConfirmPw isLogin={isLogin} setIsLogin={setIsLogin} />} />
          {/* <AuthRoute version={2} exact path="/confirmPw" element={<ConfirmPw />} /> */}
          <Route path="/editUserInfo" element={<EditUserInfo isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/category" element={<CategoryView isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/*" element={<NotFound />} />
          
          {/* <Route exact path="*" element={<NotFound />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;