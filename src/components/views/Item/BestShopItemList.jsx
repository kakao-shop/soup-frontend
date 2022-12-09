import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/ItemList.css";
import "../../../css/Pagination.css";
import "../../../css/BestShopItemList.css";

function BestShopItemList({categoryList}) {

    const location = useLocation();
    const site = location.state.site;
    const size = 100;
    const [title, setTitle] = useState("");
    const clickedSite = useRef(site);

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
            .get(`/bot/today-best`, {
                params: {
                    site: `${clickedSite.current}`,
                    size: `${size}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setTitle(`${clickedSite.current} Top 100`);
                setProduct(response.data.result.content);
                // document.getElementById("kakao").style.color = "#222222";
                // document.getElementById("kakao").style.fontWeight = "400";
        
                document.getElementById(clickedSite.current).style.color = "#FF6928";
                document.getElementById(clickedSite.current).style.fontWeight = "700";
            })
            .catch(function(error) {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error(`${site}의 Top 100 상품 정보를 불러올 수 없습니다. 😥`, {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    }, []);

    const clickSortBtnHandler = (e) => {
        document.getElementById(clickedSite.current).style.color = "#222222";
        document.getElementById(clickedSite.current).style.fontWeight = "400";
 
        clickedSite.current = e.target.id;
        document.getElementById(e.target.id).style.color = "#FF6928";
        document.getElementById(e.target.id).style.fontWeight = "700";

        axios
            .get(`/bot/today-best`, {
                params: {
                    site: `${clickedSite.current}`,
                    size: `${size}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then(function(response) {
                setTitle(`${clickedSite.current} Top 100`);
                setProduct(response.data.result.content);
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

    return (
        <div className="BestShop container">
            <Header />
            <Nav categoryList={categoryList} />
            <div className="ItemList bestshop">
                <div className="msg">
                    <h2>🏆 {title} 🏆</h2>
                </div>
                <div className="sort-group">
                    <button
                        className="sort-btn"
                        id="카카오 쇼핑"
                        onClick={clickSortBtnHandler}
                    >
                        카카오 쇼핑
                    </button>
                    <button
                        className="sort-btn"
                        id="11번가"
                        onClick={clickSortBtnHandler}
                    >
                        11번가
                    </button>
                    <button
                        className="sort-btn"
                        id="홈플러스"
                        onClick={clickSortBtnHandler}
                    >
                        홈플러스
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
                                key={`link-${item.prdName}`}
                            >
                                <div className="best-index">{
                                index === 0 ? "🥇" : 
                                index === 1 ? "🥈" :
                                index === 2 ? "🥉" : index+1}</div>
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
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )}
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

export default BestShopItemList;