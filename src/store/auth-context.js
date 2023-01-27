import React, { useEffect, useState } from "react";
import { removeCookie } from "../api/cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("nickname");

    if (storedUserInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
