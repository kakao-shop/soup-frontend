import { useEffect, useState } from "react";
import api from "../../api/apis";

import Container from "../../components/UI/Container/Container";
import Themes from "../../components/Main/Themes/Themes";
import Recommends from "../../components/Main/Recommends/Recommends";

const MainPage = (props) => {
  const [recommendResult, setRecommendResult] = useState([]);
  // const [themeList, setThemeList] = useState([]);

  useEffect(() => {
    getMainData();
  }, []);

  const getMainData = () => {
    api.get("search/main/recommendItem").then((res) => {
      // setThemeList(res.data.result.themeList);
      setRecommendResult(res.data.result.recommendResult);
    });
  };
  return (
    <main>
      <Container>
        <Themes />
        <Recommends recommendResult={recommendResult} />
      </Container>
    </main>
  );
};

export default MainPage;
