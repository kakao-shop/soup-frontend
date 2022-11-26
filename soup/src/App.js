import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage";
import LoginPage from "./components/views/LoginPage";
import JoinPage from "./components/views/JoinPage";
import ConfirmPw from "./components/views/UserPage/ConfirmPw";
import EditUserInfo from "./components/views/UserPage/EditUserInfo";
import CategoryView from "./components/views/Item/CategoryView";
import AdminPage from "./components/views/AdminPage/index";
import ItemList from "./components/views/Item/ItemList";
import ThemeItemList from "./components/views/Item/ThemeItemList";
import NotFound from "./components/views/NotFound";
import BestShopItemList from "./components/views/Item/BestShopItemList";

import "./App.css";


function App() {
    const categoryList = [
        {
            main: "과일",
            sub: {
                item: ["귤", "오렌지", "사과", "감/홍시", "토마토", "딸기", "베리류", "포도", "참외", "무화과", "키위", "파인애플", "레몬/라임", "석류", "아보카도", "견과/밤", "기타만감류", "배", "바나나", "열대과일", "기타과일"]
            }
        },
        {
            main: "채소",
            sub: {
                item: ["토란", "마늘", "양파", "대파", "쪽파", "생강", "당근", "연근", "호박", "감자", "고구마", "옥수수", "마/우엉", "가지", "오이", "파프리카", "브로콜리", "피망", "샐러드채소", "샐러리", "양상추", "양배추", "상추/깻잎", "쌈채소", "고추", "무", "배추/절임배추", "얼갈이", "버섯", "해초", "나물", "반찬채소", "샐러드", "인삼/더덕/약선재료", "기타채소"]
            }
        },
        {
            main: "축산",
            sub: {
                item: ["닭가슴살", "닭고기", "한우", "소고기", "오리고기", "수입육", "돼지고기", "가공육", "계란/알류", "기타정육"]
            }
        },
        {
            main: "수산/건어물",
            sub: {
                item: ["가자미", "갈치/삼치/고등어", "구색선어", "연어/참치", "동태/명태", "알/해삼", "갑각류", "어패류", "건어물", "김/파래김", "새우", "오징어/문어", "낙지/쭈꾸미", "기타수산물"]
            }
        },
        {
            main: "즉석식품/양념",
            sub: {
                item: ["라면", "통조림", "즉석밥", "고추장/된장/간장", "오일/기름", "소스", "시럽/잼", "참치캔", "드레싱", "고춧가루", "제빵믹스", "식초/물엿", "맛술/액젓", "다시다/미원", "죽/스프", "카레/짜장", "고춧가루/참깨", "캔", "소금/설탕", "면류", "기타식품"]
            }
        },
        {
            main: "냉장/냉동식품",
            sub: {
                item: ["반찬", "튀김류", "떡갈비/함박스테이크", "피자/핫도그", "도시락", "국/탕/찜", "김치/젓갈", "떡볶이/떡사리", "볶음/구이", "만두", "어묵/크래미", "베이컨/소시지", "밀키트", "두부/유부", "냉동생지", "냉동과일", "샌드위치/버거", "닭가슴살", "맛집", "요거트/요구르트", "치즈/버터", "돈까스/너겟/치킨", "감자튀김/치즈스틱", "볶음밥/덮밥/죽", "안주/전류", "기타식품"]
            }
        },
        {
            main: "생수/음료",
            sub: {
                item: ["생수/탄산수", "커피", "이온음료", "탄산", "차", "코코아/핫초코", "과일/야채음료", "전통음료", "건강음료", "꿀", "기타음료"]
            }
        },
        {
            main: "빵/과자",
            sub: {
                item: ["빵", "과자", "시리얼", "쿠키", "초콜릿", "젤리/푸딩", "간식/소시지", "껌", "캔디", "아이스크림", "떡", "기타제과"]
            }
        },
        {
            main: "쌀/잡곡",
            sub: {
                item: ["쌀", "현미", "흑미", "잡곡", "깨", "콩", "조", "견과", "유기농", "씨앗", "기타잡곡", "건조식품", "건조과일"]
            }
        }
    ];

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LandingPage categoryList={categoryList} /> } />
                    <Route path="/login" element={ <LoginPage categoryList={categoryList} /> } />
                    <Route path="/join" element={ <JoinPage categoryList={categoryList} /> } />
                    <Route path="/confirmPw" element={ <ConfirmPw categoryList={categoryList} /> } />
                    <Route path="/editUserInfo" element={ <EditUserInfo categoryList={categoryList} /> } />
                    <Route path="/category" element={ <CategoryView categoryList={categoryList} /> } />
                    <Route path="/*" element={ <NotFound /> } />
                    <Route path="/searchResult" element={ <ItemList categoryList={categoryList} /> } />
                    <Route path="/adm" element={ <AdminPage categoryList={categoryList} /> } />          
                    <Route path="/theme" element={ <ThemeItemList categoryList={categoryList} /> } />         
                    <Route path="/shopBest" element={ <BestShopItemList categoryList={categoryList} /> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
