import { useContext, useEffect } from "react";
import AuthContext from "../../../store/auth-context";

const MainItemTitle = (props) => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div>
      {authCtx.isLoggedIn && (
        <div>
          <h2 style={{ display: "inline-block" }}>
            {localStorage.getItem("nickname")}
          </h2>
          <span>님을 위한 추천 상품</span>
        </div>
      )}
      <div>{!authCtx.isLoggedIn && <h2>인기 상품</h2>}</div>
    </div>
  );
};

export default MainItemTitle;
