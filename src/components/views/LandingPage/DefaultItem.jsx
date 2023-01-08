import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";
import "../../../css/DefaultItem.css";

function DefaultItem() {
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

    const updateTime = useRef("알 수 없음");

    useEffect(() => {
        const getProduct = async () => {
            await axios
                .get("/search/main", {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    }
                })
                .then((response) => {
                    updateTime.current = response.data.result.crawlingTime;
                    setProduct(response.data.result.recommendResult);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
                        toast.error('상품 목록을 가져오지 못했습니다. 😥', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });
                    }
                });
        };
        getProduct();
    }, []);

    const user = {
        nickname: localStorage.getItem("nickname"),
    };

    const result = !localStorage.getItem("id") ? (
        <div id="default-header">
            <h3 style={{ width: "100%" }}>인기 상품</h3>
            <span id="update-time">최근 업데이트 {updateTime.current}</span>
        </div>
    ) : (
        <div id="default-header">
            <h3
                id="nickname"
                style={{ display: "inline-block", margin: "0 10px 0 0" }}
            >
                {user.nickname}
            </h3>
            <span>님을 위한 추천 상품</span>
            <span id="update-time">최근 업데이트 {updateTime.current}</span>
        </div>
    );

    return (
        <main className="DefaultItem container">
            <div className="default-item">
                {result}
                <div className="item-list">
                    {product.map((item, index) => (
                        <div key={"default" + index} className="item">
                            <a
                                href={item.webUrl}
                                onClick={(e) => urlSendHandler(item)}
                                className="item-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
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
                                <strong className="item-name">
                                    {item.prdName}
                                </strong>
                                <span className="item-price">
                                    {item.price.toLocaleString()} 원
                                </span>
                                <span className="item-cate">{item.subcat}</span>
                            </a>
                        </div>
                    ))}
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
        </main>
    );
}

export default DefaultItem;
