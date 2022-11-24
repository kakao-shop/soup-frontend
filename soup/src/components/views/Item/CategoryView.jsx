import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

import Header from "../Header";
import Nav from "../Nav";
import { urlSendHandler } from "../../SelectItemCount";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";

function CategoryView({ isLogin, setIsLogin }) {
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
                item: ["가자미", "갈치/삼치/고등어", "구색선어", "연어/참치", "동태/명태", "알/해삼", "갑각류", "어패류", "건어물", "김/파래김", "새우", "오징어/문어", "낙지/쭈꾸미", "알/해삼", "갑각류", "건어물", "김/파래김", "기타수산물"]
            }
        },
        {
            main: "즉석식품/양념",
            sub: {
                item: ["라면", "통조림", "고추장/된장/간장", "오일/기름", "소스", "시럽/잼", "즉석밥", "참치캔", "드레싱", "고춧가루", "제빵믹스", "식초/물엿", "맛술/액젓", "다시다/미원", "안주/전류", "죽/스프", "카레/짜장", "고춧가루/참깨", "캔", "안주/전류", "소금/설탕", "면류", "기타식품"]
            }
        },
        {
            main: "냉장/냉동식품",
            sub: {
                item: ["반찬", "튀김류", "떡갈비/함박스테이크", "피자/핫도그", "도시락", "국/탕/찜", "김치/젓갈", "떡볶이/떡사리", "볶음/구이", "만두", "어묵/크래미", "베이컨/소시지", "밀키트", "두부/유부", "냉동생지", "냉동과일", "샌드위치/버거", "닭가슴살", "맛집", "요거트/요구르트", "치즈/버터", "돈까스/너겟/치킨", "감자튀김/치즈스틱", "볶음밥/덮밥/죽", "안주/전류", "국/탕/찜", "기타식품"]
            }
        },
        {
            main: "생수/음료",
            sub: {
                item: ["전통음료", "이온음료", "탄산", "커피", "건강음료", "생수/탄산수", "차", "코코아/핫초코", "꿀", "과일/야채음료", "기타음료"]
            }
        },
        {
            main: "제과/빵",
            sub: {
                item: ["과자", "시리얼", "쿠키", "초콜릿", "젤리/푸딩", "간식/소시지", "껌", "캔디", "빵", "아이스크림", "떡", "기타제과"]
            }
        },
        {
            main: "쌀/잡곡",
            sub: {
                item: ["현미", "흑미", "잡곡", "건조식품", "건조과일", "깨", "씨앗", "유기농", "콩", "쌀", "견과", "조", "기타잡곡"]
            }
        }
    ];

    const location = useLocation();
    const num = location.state.idx;
    const search = location.state.subcat;
    const subList = categoryList[num].sub.item;

    const [isBot, setIsBot] = useState(true);
    const [category, setCategory] = useState(search);
    const [size, setSize] = useState("30");
    const [sort, setSort] = useState("purchase,desc");
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const page = useRef(0);
    const clickedSort = useRef("purchase,desc");
    const idx = useRef("0");
    const [clickedIdx, setClickedIdx] = useState("0");

    const [product, setProduct] = useState([
        {
            id: "상품명",
            score: "이미지URL",
            site: "상품 가격(원)",
            prdName: "상품 가격(원)",
            webUrl: "대분류카테고리",
            price: "소분류카테고리",
            purchase: 0,
            cat: "사이트",
            subcat: "",
            imgSrc: "",
        },
    ]);
    const getCategory = async (e) => {
        let cat = "";
        cat = search;
        setIsBot(false);
        await getProduct(cat);
    };

    const getProduct = async (cat) => {
        setCategory(cat);
        idx.current = document.getElementById(cat).classList[1];
        setClickedIdx(document.getElementById(cat).classList[1]);

        document.getElementsByClassName(`subBtn ${clickedIdx}`)[0].style.color =
            "#222222";
        document.getElementsByClassName(
            `subBtn ${clickedIdx}`
        )[0].style.fontWeight = "400";
        document.getElementById(clickedSort.current).style.color = "#222222";
        document.getElementById(clickedSort.current).style.fontWeight = "400";

        clickedSort.current = "purchase,desc";

        document.getElementsByClassName(
            `subBtn ${idx.current}`
        )[0].style.color = "#FF6928";
        document.getElementsByClassName(
            `subBtn ${idx.current}`
        )[0].style.fontWeight = "700";
        document.getElementById("purchase,desc").style.color = "#FF6928";
        document.getElementById("purchase,desc").style.fontWeight = "700";

        page.current = 0;

        await axios
            .get("/search/subcat", {
                params: {
                    category: `${cat}`,
                    size: `${size}`,
                    sort: `${clickedSort.current}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                alert("상품에 대한 특가 정보를 가져오지 못했습니다.");
                console.log(error);
            });
    };

    const clickSortBtnHandler = (e) => {
        const sortValue = e.target.id;

        document.getElementById(clickedSort.current).style.color = "#222222";
        document.getElementById(clickedSort.current).style.fontWeight = "400";

        clickedSort.current = sortValue;
        setSort(sortValue);
        page.current = 0;

        document.getElementById(e.target.id).style.color = "#FF6928";
        document.getElementById(e.target.id).style.fontWeight = "700";
        axios
            .get("/search/subcat", {
                params: {
                    category: `${category}`,
                    size: `${size}`,
                    sort: `${sortValue}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                console.log(error);
                alert("상품을 정렬하지 못했습니다.");
            });
    };

    const handlePageChange = async (Page) => {
        page.current = Page - 1;
        await axios
            .get("/search/subcat", {
                params: {
                    category: `${category}`,
                    size: `${size}`,
                    sort: `${sort}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                alert("현재 페이지의 특가 상품을 가져올 수 없습니다.");
                console.log(error);
            });
    };

    useEffect(() => {
        getCategory();
    }, [search]);

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin} />
            <Nav />
            <div className="CategoryView container">
                <div className="SubCategoryList container">
                    <h2>{categoryList[num].main}</h2>
                    <div className="subCategoryBox">
                        {subList.map((sub, index) => (
                            <button
                                className={`subBtn ${index}`}
                                key={`cateSub${index + 1}`}
                                id={sub}
                                onClick={(e) => getProduct(e.target.innerText)}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ItemList">
                    <div className="msg">
                        <h3>“ {category} ”</h3>
                        <span>
                            의 특가 상품이
                            <strong
                                style={{ color: "#FF6928", fontSize: "18px" }}
                            >
                                {totalElements}
                            </strong>
                            개 검색되었습니다.
                        </span>
                    </div>
                    <div className="sort-group">
                        <button
                            className="sort-btn"
                            id="purchase,desc"
                            onClick={clickSortBtnHandler}
                        >
                            판매량순
                        </button>
                        <button
                            className="sort-btn"
                            id="price,asc"
                            onClick={clickSortBtnHandler}
                        >
                            가격낮은순
                        </button>
                        <button
                            className="sort-btn"
                            id="price,desc"
                            onClick={clickSortBtnHandler}
                        >
                            가격높은순
                        </button>
                    </div>
                    <div className="itemList">
                        {product && product.length > 0 ? (
                            product.map((item, index) => (
                                <a
                                    href={item.webUrl}
                                    onClick={(e) => urlSendHandler(item.webUrl)}
                                    className="item-link"
                                    target="_blank"
                                    key={`a-${index}`}
                                >
                                    <div
                                        className="list-item"
                                        key={`상품목록${index + 1}`}
                                    >
                                        <div className="item-img">
                                            {item.imgSrc !== null ? (
                                                <img
                                                    src={item.imgSrc}
                                                    alt="item"
                                                />
                                            ) : (
                                                <img
                                                    src="img/no-img.png"
                                                    alt="No source"
                                                />
                                            )}
                                        </div>
                                        <div className="item-info">
                                            <div>
                                                <strong className="item-name">
                                                    {item.prdName}
                                                </strong>
                                                <div className="item-price">
                                                    {item.price.toLocaleString()}{" "}
                                                    원
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-desc">
                                            <div>
                                                <span>카테고리</span>
                                                <span>
                                                    {item.cat}&gt;
                                                    <br />
                                                    {item.subcat}
                                                </span>
                                            </div>
                                            <div>
                                                <span>구매횟수</span>
                                                <span>{item.purchase}</span>
                                            </div>
                                            <div>
                                                <span>판매처</span>
                                                <span>{item.site}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="result-msg">
                                검색 결과가 없습니다.
                            </div>
                        )}
                    </div>
                </div>
                <Pagination
                    activePage={page.current + 1}
                    itemsCountPerPage={30}
                    totalItemsCount={totalElements}
                    pageRangeDisplay={totalPages}
                    onChange={handlePageChange}
                    innerClass="page-ul"
                    itemClass="page-li"
                    activeClass="page-active"
                    activeLinkClass="pagelink-active"
                ></Pagination>
            </div>
        </div>
    );
}

export default CategoryView;
