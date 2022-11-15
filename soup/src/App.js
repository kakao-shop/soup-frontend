import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './components/views/LandingPage'; 
import LoginPage from './components/views/LoginPage';
import JoinPage from './components/views/JoinPage';
import ConfirmPw from './components/views/UserPage/ConfirmPw';
import EditUserInfo from './components/views/UserPage/EditUserInfo';
import CategoryView from './components/views/Item/CategoryView';
import AdminPage from './components/views/AdminPage1';
import ItemList from './components/views/Item/ItemList';
import ThemeItemList from "./components/views/Item/ThemeItemList";
import NotFound from "./components/views/NotFound";

import './App.css';


function App() {
 
  const categoryList = [
    {
      main: "대분류 선택",
      sub: ["소분류 선택"]    
    },
    {
      main: "과일",
      sub: ["감/홍시", "사과", "귤", "포도", "열대과일", "견과/밤", "키위", "배", "토마토", "자몽", "아보카도", "바나나", "기타만감류", "메론", "오렌지", "레몬/라임", "무화과", "베리류", "파인애플", "수박", "딸기", "기타과일", "견과/밤/대추"]
    },
    {
      main: "채소",
      sub: ["마/우엉", "무/열무", "토마토", "버섯", "배추/절임배추", "샐러드", "샐러드채소", "감자", "호박", "나물", "옥수수", "고추", "양파", "파프리카", "당근", "인삼/더덕/약선재료", "오이", "반찬채소", "쌈채소", "쪽파", "브로콜리", "연근", "생강", "가지", "피망", "양상추", "얼갈이", "토란", "아스파라거스", "기타채소", "대파"]
    },
    {
      main: "축산",
      sub: ["가공육", "돼지고기", "소고기", "계란/알류", "수입육", "닭", "한우", "기타정육", "기타축산", "오리고기"]
    },
    {
      main: "수산/건어물",
      sub: ["건어물", "김/파래김", "어패류", "새우", "갑각류", "구색선어", "오징어/문어", "갈치/삼치/고등어", "알/해삼", "낙지/쭈꾸미", "연어/참치", "가자미", "동태/명태", "기타수산"]
    },
    {
      main: "즉석식품/양념",
      sub: ["즉석밥", "죽/스프", "카레/짜장", "소금/설탕", "스팸/햄", "도시락", "참치캔", "라면", "통조림", "소스", "오일/기름", "고춧가루", "깨", "다시다/미원", "사리얼", "고추장/된장/간장", "맛술/액젓", "식초/물엿", "제빵믹스", "기타즉석", "시럽/잼", "케찹/마요네즈", "드레싱"]
    },
    {
      main: "냉장/냉동식품",
      sub: ["김치/젓갈", "밀키트", "면류", "요거트/요구르트", "국/탕/찜", "만두", "반찬/절임류", "아이스크림", "볶음/구이", "우유", "돈까스/너겟/치킨", "과일/야채음료", "두부/유부", "맛집", "어묵/유부/크래미", "피자/핫도그", "베이컨/소시지", "냉동과일", "안주/전류", "치즈/버터", "볶음밥/덮밥/죽", "떡볶이/떡사리", "젤리/푸딩", "감자튀김/치즈스틱", "떡갈비/함박스테이크", "닭가슴살", "두유", "튀김류", "샌드위치/버거", "기타식품", "베이커리"]
    },
    {
      main: "생수/음료",
      sub: ["커피", "건강식품", "탄산", "차", "과일/야채음료", "생수/탄산수", "기타음료", "코코아/핫초코", "전통음료", "꿀", "이온음료"]
    },
    {
      main: "과자/빵",
      sub: ["초콜릿", "과자", "쿠키", "시리얼", "튀김", "빵", "간식류소시지", "떡", "아이스크림", "캔디", "소스"]
    },
    {
      main: "쌀/잡곡",
      sub: ["쌀", "잡곡", "현미", "흑미", "견과", "건조식품", "건조과일", "깨", "콩", "조", "유기농", "씨앗"]
    }
  ]


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
          <Route path="/searchResult" element={<ItemList isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/admin/*" element={<AdminPage isLogin={isLogin} setIsLogin={setIsLogin} category={categoryList} />} />
          <Route path="/theme" element={<ThemeItemList isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          {/* <Route exact path="*" element={<NotFound />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;