import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { reissuanceAccessToken } from "../../jwtTokenModules";
import { urlSendHandler } from "../../SelectItemCount";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";

function ThemeItemList({ categoryList }) {
    const size ="30";
    const [title, setTitle] = useState("");
    const page = useRef(0);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const location = useLocation();
    const themeIdx = location.state.themeIdx;

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
        page.current = 0;
        axios
            .get(`/search/collections/${themeIdx}`, {
                params: {
                    size: `${size}`,
                    page: `${page.current}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setTitle(response.data.result.title);
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('상품 정보를 가져오지 못했습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    }, [themeIdx]);

    const handlePageChange = async (Page) => {
        page.current = Page - 1;
        axios
            .get(`/search/collections/${themeIdx}`, {
                params: {
                    size: `${size}`,
                    page: `${page.current}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setTitle(response.data.result.title);
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('현재 페이지의 특가 상품 정보를 불러올 수 없습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    };

    return (
        <div>
            <Header />
            <Nav categoryList={categoryList} />
            <div className="ThemeItemList container">
                <div className="ItemList">
                    <div className="msg">
                        <h3>“ {title} ”</h3>
                        <span>
                            테마 상품이
                            <strong style={{ color: "#FF6928", fontSize: "18px" }}>
                                {totalElements}
                            </strong>
                            개 검색되었습니다.
                        </span>
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
                                    key={`link-${item.prdName}`}
                                >
                                    <div
                                        className="list-item"
                                        key={`상품목록${index + 1}`}
                                    >
                                        <div className="item-img">
                                            {item.imgSrc === null ? (
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
                                                    src={item.imgSrc}
                                                    alt="Item"
                                                    className="item-img"
                                                />
                                            )}
                                        </div>

                                        <div className="item-info">
                                            <div>
                                                <strong className="item-name">
                                                    {item.prdName}
                                                </strong>
                                                <div className="item-price">
                                                    {item.price.toLocaleString()} 원
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

export default ThemeItemList;
