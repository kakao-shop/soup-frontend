import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";

function ItemList({ isLogin, setIsLogin }) {
    const [size, setsize] = useState("30");
    const [sort, setsort] = useState("purchase,desc");
    const [title, setTitle] = useState("");
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);    
    const page = useRef(0);
    const clickedSort = useRef("purchase,desc");


    const location = useLocation();
    const num = location.state;

    
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

    useEffect(() => {
        console.log("useEffect");
        document.getElementById(clickedSort.current).style.color = "#222222";
        document.getElementById(clickedSort.current).style.fontWeight = "400";

        clickedSort.current = "purchase,desc";
        page.current = 0;

        document.getElementById(clickedSort.current).style.color = "#FF6928";
        document.getElementById(clickedSort.current).style.fontWeight = "700";

        axios
            .get("/search", {
                params: {
                    q: `${num}`,
                    size: `${size}`,
                    sort: `${clickedSort.current}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                alert("error");
                console.log(error);
            });
    }, [num]);


    const clickSortBtnHandler = (e) => {
        const sortValue = e.target.id;
        
        document.getElementById(clickedSort.current).style.color = "#222222";
        document.getElementById(clickedSort.current).style.fontWeight = "400";

        clickedSort.current = sortValue;
        page.current = 0;
        document.getElementById(sortValue).style.color = "#FF6928";
        document.getElementById(sortValue).style.fontWeight = "700";

        axios
        .get("/search", {
            params: {
                q: `${num}`,
                size: `${size}`,
                sort: `${sortValue}`,
                page: `${page.current}`,
            },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                console.log(response)
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                alert("error");
                console.log(error);
            });
    };

    const handlePageChange = async (Page) => {
        page.current = Page - 1;
        axios
            .get("/search", {
                params: {
                    q: `${num}`,
                    size: `${size}`,
                    sort: `${clickedSort.current}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                alert("error");
                console.log(error);
            });
    };

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin} />
            <Nav />

            <div className="ItemList container" style={{marginTop: "50px"}}>
                <div className="msg">
                    <h3>“ {num} ”</h3>
                    <span>의 특가 상품이  <strong style={{color: "#FF6928", fontSize: "18px"}}>{totalElements}</strong>개 검색되었습니다.</span>
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
                        product.map((data, index) => (
                            <a
                                href={data.webUrl}
                                className="item-link"
                                target="_blank"
                                key={`item-link${index}`}
                            >
                                <div
                                    className="list-item"
                                    key={`상품목록${index + 1}`}
                                >
                                    <div className="item-img">
                                        {data.imgSrc === null ? (
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    "/img/no-img.png"
                                                }
                                                alt="Item"
                                                className="item-img"
                                            />
                                        ) : (
                                            <img
                                                src={data.imgSrc}
                                                alt="Item"
                                                className="item-img"
                                            />
                                        )}
                                    </div>

                                    <div className="item-info">
                                        <div>
                                            <strong className="item-name">
                                                {data.prdName}
                                            </strong>
                                            <div className="item-price">
                                                {data.price.toLocaleString()} 원
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-desc">
                                        <div>
                                            <span>카테고리</span>
                                            <span>
                                                {data.cat}
                                                {data.subcat}
                                            </span>
                                        </div>
                                        <div>
                                            <span>구매횟수</span>
                                            <span>{data.purchase}</span>
                                        </div>
                                        <div>
                                            <span>판매처</span>
                                                <span>
                                                    {data.site === "home"
                                                        ? "Homeplus"
                                                        : data.site === "street"
                                                        ? "11번가"
                                                        : "kakao"}
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="no-search">검색 결과가 없습니다.</div>
                    )}
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

export default ItemList;
