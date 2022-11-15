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
    const page = useRef(0);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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
        axios
            .get("/search", {
                params: {
                    q: `${num}`,
                    size: `${size}`,
                    sort: `${sort}`,
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

    const handlePageChange = async (Page) => {
        page.current = Page - 1;
        axios
            .get("/search", {
                params: {
                    q: `${num}`,
                    size: `${size}`,
                    sort: `${sort}`,
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
                console.log(error)
            });
    };

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin} />
            <Nav />

            <div className="ItemList">
                <div className="itemList">
                    <div className="msg">
                        <h3>{num}</h3>
                        <span>의 특가 상품이 검색되었습니다.</span>
                    </div>
                    {product && product.length > 0 ? (
                        product.map((data, index) => (
                            <a href={data.webUrl} className="item-link" key={`item-link${index}`}>
                                <div
                                    className="list-item"
                                    key={`상품목록${index + 1}`}
                                >
                                    <div className="item-img">
                                        
                                        {data.imgSrc === null
                            ? <img src={process.env.PUBLIC_URL + '/img/no-img.png'} alt="Item" className="item-img" />
                            : <img src={data.imgSrc} alt="Item" className="item-img" />
                            }
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
                                            <span>{data.site}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div>검색 결과가 없습니다.</div>
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
