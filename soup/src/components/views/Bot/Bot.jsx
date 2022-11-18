import { useRef } from "react";

import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";

import Search from "./Search";
import TriggerMaker from "./TriggerMaker";

const Bot = function() {

    const themeList = useRef([]);

    axios
        .get("/bot/collections", {
            headers: {
                "x-access-token": localStorage.getItem("access_token"),
            },
        })
        .then((response) => {
          themeList.current = JSON.parse(response.data.result);
        })
        .catch((error) => {
            alert("테마가 존재하지 않거나 출력할 수 없습니다.");
            console.log(error);
        });

    
    const steps = [
        {
            id: "start",
            message: "수프봇입니다. 어떤걸 검색할까요?",
            trigger: "search-type",
        },
        {
            id: "search-type",
            options: [
                {
                    value: "category",
                    label: "카테고리 검색",
                    trigger: "selectCat",
                },
                {
                    value: "theme",
                    label: "테마별 검색",
                    trigger: "selectTheme",
                },
            ],
        },
        {
            id: "selectCat",
            message: "카테고리를 골라주세요",
            trigger: "categories",
        },
        {
            id: "selectTheme",
            // component: <Theme />,
            message: "어떤 테마를 검색하시겠습니까?",
            trigger: "themes",
        },
        {
            id: "categories",
            options: [
                { value: "0", label: "과일", trigger: "triggerMaker" },
                { value: "1", label: "채소", trigger: "triggerMaker" },
                { value: "2", label: "축산", trigger: "triggerMaker" },
                { value: "3", label: "수산/건어물", trigger: "triggerMaker" },
                { value: "4", label: "즉석식품/양념", trigger: "triggerMaker" },
                {
                    value: "5",
                    label: "냉장/냉동식품",
                    trigger: "triggerMaker",
                },
                { value: "6", label: "생수/음료", trigger: "triggerMaker" },
                {
                    value: "7",
                    label: "과자/빵",
                    trigger: "triggerMaker",
                },
                {
                    value: "8",
                    label: "쌀/잡곡",
                    trigger: "triggerMaker",
                },
            ],
        },
        {
            id: "triggerMaker",
            component: <TriggerMaker />,
            asMessage: true,
        },
        {
            id: "themes",
            options: themeList.current,
            metadata: {
                param: "theme",
            },
        },
        {
            id: "0",
            options: [
                { value: "감/홍시", label: "감/홍시", trigger: "last" },
                { value: "사과", label: "사과", trigger: "last" },
                { value: "귤", label: "귤", trigger: "last" },
                { value: "포도", label: "포도", trigger: "last" },
                { value: "열대과일", label: "열대과일", trigger: "last" },
                { value: "견과/밤", label: "견과/밤", trigger: "last" },
                { value: "키위", label: "키위", trigger: "last" },
                { value: "배", label: "배", trigger: "last" },
                { value: "토마토", label: "토마토", trigger: "last" },
                { value: "자몽", label: "자몽", trigger: "last" },
                { value: "아보카도", label: "아보카도", trigger: "last" },
                { value: "바나나", label: "바나나", trigger: "last" },
                { value: "기타만감류", label: "기타만감류", trigger: "last" },
                { value: "메론", label: "메론", trigger: "last" },
                { value: "오렌지", label: "오렌지", trigger: "last" },
                { value: "레몬/라임", label: "레몬/라임", trigger: "last" },
                { value: "무화과", label: "무화과", trigger: "last" },
                { value: "베리류", label: "베리류", trigger: "last" },
                { value: "파인애플", label: "파인애플", trigger: "last" },
                { value: "수박", label: "수박", trigger: "last" },
                { value: "딸기", label: "딸기", trigger: "last" },
                { value: "기타과일", label: "기타과일", trigger: "last" },
                {
                    value: "견과/밤/대추",
                    label: "견과/밤/대추",
                    trigger: "last",
                },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "1",
            options: [
                { value: "마/우엉", label: "마/우엉", trigger: "last" },
                { value: "무/열무", label: "무/열무", trigger: "last" },
                { value: "토마토", label: "토마토", trigger: "last" },
                { value: "버섯", label: "버섯", trigger: "last" },
                {
                    value: "배추/절임배추",
                    label: "배추/절임배추",
                    trigger: "last",
                },
                { value: "샐러드", label: "샐러드", trigger: "last" },
                { value: "샐러드채소", label: "샐러드채소", trigger: "last" },
                { value: "감자", label: "감자", trigger: "last" },
                { value: "호박", label: "호박", trigger: "last" },
                { value: "나물", label: "나물", trigger: "last" },
                { value: "옥수수", label: "옥수수", trigger: "last" },
                { value: "고추", label: "고추", trigger: "last" },
                { value: "양파", label: "양파", trigger: "last" },
                { value: "파프리카", label: "파프리카", trigger: "last" },
                { value: "당근", label: "당근", trigger: "last" },
                {
                    value: "인삼/더덕/약선재료",
                    label: "인삼/더덕/약선재료",
                    trigger: "last",
                },
                { value: "오이", label: "오이", trigger: "last" },
                { value: "반찬채소", label: "반찬채소", trigger: "last" },
                { value: "쌈채소", label: "쌈채소", trigger: "last" },
                { value: "쪽파", label: "쪽파", trigger: "last" },
                { value: "브로콜리", label: "브로콜리", trigger: "last" },
                { value: "연근", label: "연근", trigger: "last" },
                { value: "생강", label: "생강", trigger: "last" },
                { value: "가지", label: "가지", trigger: "last" },
                { value: "피망", label: "피망", trigger: "last" },
                { value: "양상추", label: "양상추", trigger: "last" },
                { value: "얼갈이", label: "얼갈이", trigger: "last" },
                { value: "토란", label: "토란", trigger: "last" },
                {
                    value: "아스파라거스",
                    label: "아스파라거스",
                    trigger: "last",
                },
                { value: "기타채소", label: "기타채소", trigger: "last" },
                { value: "대파", label: "대파", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "2",
            options: [
                { value: "가공육", label: "가공육", trigger: "last" },
                { value: "돼지고기", label: "돼지고기", trigger: "last" },
                { value: "소고기", label: "소고기", trigger: "last" },
                { value: "계란/알류", label: "계란/알류", trigger: "last" },
                { value: "수입육", label: "수입육", trigger: "last" },
                { value: "닭", label: "닭", trigger: "last" },
                { value: "한우", label: "한우", trigger: "last" },
                { value: "기타정육", label: "기타정육", trigger: "last" },
                { value: "기타축산", label: "기타축산", trigger: "last" },
                { value: "오리고기", label: "오리고기", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "3",
            options: [
                { value: "건어물", label: "건어물", trigger: "last" },
                { value: "김/파래김", label: "김/파래김", trigger: "last" },
                { value: "어패류", label: "어패류", trigger: "last" },
                { value: "새우", label: "새우", trigger: "last" },
                { value: "갑각류", label: "갑각류", trigger: "last" },
                { value: "구색선어", label: "구색선어", trigger: "last" },
                { value: "오징어/문어", label: "오징어/문어", trigger: "last" },
                {
                    value: "갈치/삼치/고등어",
                    label: "갈치/삼치/고등어",
                    trigger: "last",
                },
                { value: "알/해삼", label: "알/해삼", trigger: "last" },
                { value: "낙지/쭈꾸미", label: "낙지/쭈꾸미", trigger: "last" },
                { value: "연어/참치", label: "연어/참치", trigger: "last" },
                { value: "가자미", label: "가자미", trigger: "last" },
                { value: "동태/명태", label: "동태/명태", trigger: "last" },
                { value: "기타수산", label: "기타수산", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "4",
            options: [
                { value: "즉석밥", label: "즉석밥", trigger: "last" },
                { value: "죽/스프", label: "죽/스프", trigger: "last" },
                { value: "카레/짜장", label: "카레/짜장", trigger: "last" },
                { value: "소금/설탕", label: "소금/설탕", trigger: "last" },
                { value: "스팸/햄", label: "스팸/햄", trigger: "last" },
                { value: "도시락", label: "도시락", trigger: "last" },
                { value: "참치캔", label: "참치캔", trigger: "last" },
                { value: "라면", label: "라면", trigger: "last" },
                { value: "통조림", label: "통조림", trigger: "last" },
                { value: "소스", label: "소스", trigger: "last" },
                { value: "오일/기름", label: "오일/기름", trigger: "last" },
                { value: "고춧가루", label: "고춧가루", trigger: "last" },
                { value: "깨", label: "깨", trigger: "last" },
                { value: "다시다/미원", label: "다시다/미원", trigger: "last" },
                { value: "사리얼", label: "사리얼", trigger: "last" },
                {
                    value: "고추장/된장/간장",
                    label: "고추장/된장/간장",
                    trigger: "last",
                },
                { value: "맛술/액젓", label: "맛술/액젓", trigger: "last" },
                { value: "식초/물엿", label: "식초/물엿", trigger: "last" },
                { value: "제빵믹스", label: "제빵믹스", trigger: "last" },
                { value: "기타즉석", label: "기타즉석", trigger: "last" },
                { value: "시럽/잼", label: "시럽/잼", trigger: "last" },
                {
                    value: "케찹/마요네즈",
                    label: "케찹/마요네즈",
                    trigger: "last",
                },
                { value: "드레싱", label: "드레싱", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "5",
            options: [
                { value: "김치/젓갈", label: "김치/젓갈", trigger: "last" },
                { value: "밀키트", label: "밀키트", trigger: "last" },
                { value: "면류", label: "면류", trigger: "last" },
                {
                    value: "요거트/요구르트",
                    label: "요거트/요구르트",
                    trigger: "last",
                },
                { value: "국/탕/찜", label: "국/탕/찜", trigger: "last" },
                { value: "만두", label: "만두", trigger: "last" },
                { value: "반찬/절임류", label: "반찬/절임류", trigger: "last" },
                { value: "아이스크림", label: "아이스크림", trigger: "last" },
                { value: "볶음/구이", label: "볶음/구이", trigger: "last" },
                { value: "우유", label: "우유", trigger: "last" },
                {
                    value: "돈까스/너겟/치킨",
                    label: "돈까스/너겟/치킨",
                    trigger: "last",
                },
                {
                    value: "과일/야채음료",
                    label: "과일/야채음료",
                    trigger: "last",
                },
                { value: "두부/유부", label: "두부/유부", trigger: "last" },
                { value: "맛집", label: "맛집", trigger: "last" },
                {
                    value: "어묵/유부/크래미",
                    label: "어묵/유부/크래미",
                    trigger: "last",
                },
                { value: "피자/핫도그", label: "피자/핫도그", trigger: "last" },
                {
                    value: "베이컨/소시지",
                    label: "베이컨/소시지",
                    trigger: "last",
                },
                { value: "냉동과일", label: "냉동과일", trigger: "last" },
                { value: "안주/전류", label: "안주/전류", trigger: "last" },
                { value: "치즈/버터", label: "치즈/버터", trigger: "last" },
                {
                    value: "볶음밥/덮밥/죽",
                    label: "볶음밥/덮밥/죽",
                    trigger: "last",
                },
                {
                    value: "떡볶이/떡사리",
                    label: "떡볶이/떡사리",
                    trigger: "last",
                },
                { value: "젤리/푸딩", label: "젤리/푸딩", trigger: "last" },
                {
                    value: "감자튀김/치즈스틱",
                    label: "감자튀김/치즈스틱",
                    trigger: "last",
                },
                {
                    value: "떡갈비/함박스테이크",
                    label: "떡갈비/함박스테이크",
                    trigger: "last",
                },
                { value: "닭가슴살", label: "닭가슴살", trigger: "last" },
                { value: "두유", label: "두유", trigger: "last" },
                { value: "튀김류", label: "튀김류", trigger: "last" },
                {
                    value: "샌드위치/버거",
                    label: "샌드위치/버거",
                    trigger: "last",
                },
                { value: "기타식품", label: "기타식품", trigger: "last" },
                { value: "베이커리", label: "베이커리", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "6",
            options: [
                { value: "커피", label: "커피", trigger: "last" },
                { value: "건강식품", label: "건강식품", trigger: "last" },
                { value: "탄산", label: "탄산", trigger: "last" },
                { value: "차", label: "차", trigger: "last" },
                {
                    value: "과일/야채음료",
                    label: "과일/야채음료",
                    trigger: "last",
                },
                { value: "생수/탄산수", label: "생수/탄산수", trigger: "last" },
                { value: "기타음료", label: "기타음료", trigger: "last" },
                {
                    value: "코코아/핫초코",
                    label: "코코아/핫초코",
                    trigger: "last",
                },
                { value: "전통음료", label: "전통음료", trigger: "last" },
                { value: "꿀", label: "꿀", trigger: "last" },
                { value: "이온음료", label: "이온음료", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "7",
            options: [
                { value: "초콜릿", label: "초콜릿", trigger: "last" },
                { value: "과자", label: "과자", trigger: "last" },
                { value: "쿠키", label: "쿠키", trigger: "last" },
                { value: "시리얼", label: "시리얼", trigger: "last" },
                { value: "튀김", label: "튀김", trigger: "last" },
                { value: "빵", label: "빵", trigger: "last" },
                {
                    value: "간식류소시지",
                    label: "간식류소시지",
                    trigger: "last",
                },
                { value: "떡", label: "떡", trigger: "last" },
                { value: "아이스크림", label: "아이스크림", trigger: "last" },
                { value: "캔디", label: "캔디", trigger: "last" },
                { value: "소스", label: "소스", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },
        {
            id: "8",
            options: [
                { value: "쌀", label: "쌀", trigger: "last" },
                { value: "잡곡", label: "잡곡", trigger: "last" },
                { value: "현미", label: "현미", trigger: "last" },
                { value: "흑미", label: "흑미", trigger: "last" },
                { value: "견과", label: "견과", trigger: "last" },
                { value: "건조식품", label: "건조식품", trigger: "last" },
                { value: "건조과일", label: "건조과일", trigger: "last" },
                { value: "깨", label: "깨", trigger: "last" },
                { value: "콩", label: "콩", trigger: "last" },
                { value: "조", label: "조", trigger: "last" },
                { value: "유기농", label: "유기농", trigger: "last" },
                { value: "씨앗", label: "씨앗", trigger: "last" },
            ],
            metadata: {
                param: "category",
            },
        },

        {
            id: "last",
            component: <Search />,
            waitAction: true,
            trigger: "start",
        },
    ];

    const config = {
        width: "300px",
        height: "400px",
        floating: true,
        headerTitle: "수프봇",
    };

    const theme = {
        background: "#f5f8fb",
        fontFamily: "Helvetica Neue",
        headerBgColor: "#EF6C00",
        headerFontColor: "#fff",
        headerFontSize: "15px",
        botBubbleColor: "#EF6C00",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4a4a4a",
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <ChatBot steps={steps} {...config} />
            </ThemeProvider>
        </>
    );
};

export default Bot;
