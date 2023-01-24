import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/auth-context";

import Header from "./components/Layout/Header/Header";
import Nav from "./components/Layout/Nav/Nav";

import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CartPage from "./pages/CartPage/CartPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  // const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admins" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
