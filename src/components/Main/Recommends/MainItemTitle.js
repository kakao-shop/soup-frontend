import { useState } from "react";

const MainItemTitle = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin && (
        <h2>
          강아람<span>님을 위한 추천</span>
        </h2>
      )}
      {!isLogin && <h2>인기 상품</h2>}
    </div>
  );
};

export default MainItemTitle;
