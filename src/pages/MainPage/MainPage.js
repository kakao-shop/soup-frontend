import { useEffect, useState } from "react";
import axios from "axios";

import Container from "../../components/UI/Container/Container";
import Themes from "../../components/Main/Themes/Themes";
import Recommends from "../../components/Main/Recommends/Recommends";

const MainPage = (props) => {
  const [recommendResult, setRecommendResult] = useState([]);
  const [themeList, setThemeList] = useState([]);

  useEffect(() => {
    getMainData();
  }, []);

  const getMainData = () => {
    axios
      .get("search/main/recommendItem", {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data.result.themeList);
        setThemeList(response.data.result.themeList);
        setRecommendResult(response.data.result.recommendResult);
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
