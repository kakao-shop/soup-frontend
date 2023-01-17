import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Layout/Header/Header";
import Nav from "./components/Layout/Nav/Nav";

import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
