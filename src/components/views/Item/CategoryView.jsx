import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";

function CategoryView({ categoryList }) {

    const location = useLocation();
    const num = location.state.idx;
    const search = location.state.subcat;
    const subList = categoryList[num].sub.item;

    const [category, setCategory] = useState(search);
    const size = "30";
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
    const getCategory = async () => {
        let cat = "";
        cat = search;
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
                    page: `${page.current}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('상품에 대한 특가 정보를 불러올 수 없습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
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
                    page: `${page.current}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('상품을 정렬할 수 없습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
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
                    page: `${page.current}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('상품 정보를 불러올 수 없습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    };

    useEffect(() => {
        getCategory();
    }, [search]);

    return (
        <div>
            <Header />
            <Nav categoryList={categoryList}/>
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
                                    onClick={(e) => urlSendHandler(item)}
                                    className="item-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    innerClass="page-ul"
                    itemClass="page-li"
                    activeClass="page-active"
                    activeLinkClass="pagelink-active"
                ></Pagination>
            </div>
            <ToastContainer 
                    position= "top-right" 
                    autoClose= {700} 
                    transition= "Slide"
                    hideProgressBar 
                    closeOnClick
                    rtl={false}
                    pauseOnHover 
                    draggable= {false} />
        </div>
    );
}

export default CategoryView;
