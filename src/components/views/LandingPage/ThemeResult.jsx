import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

<<<<<<< HEAD:src/components/views/LandingPage/ThemeResult.jsx
=======
import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/DefaultItem.jsx
import "../../../css/DefaultItem.css";

function ThemeResult(idx) {
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
        const getProduct = async () => {
            await axios
<<<<<<< HEAD:src/components/views/LandingPage/ThemeResult.jsx
                .get("/search/collections/" + idx.idx.idx, {
=======
                .get("/search/main", {
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/DefaultItem.jsx
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    }
                })
                .then((response) => {
<<<<<<< HEAD:src/components/views/LandingPage/ThemeResult.jsx
                    setProduct(response.data.result.result.content);
                })
                .catch((error) => {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
                        toast.error('상품 목록을 가져오지 못했습니다. 😥', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });
                        console.log(error);
=======
                    updateTime.current = response.data.result.crawlingTime;
                    setProduct(response.data.result.recommendResult);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
                        alert("상품 목록을 가져오지 못했습니다.");
                        console.log(error.response);
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/DefaultItem.jsx
                    }
                });
        };
        getProduct();
<<<<<<< HEAD:src/components/views/LandingPage/ThemeResult.jsx
    }, [idx]);

    const result = <h3 style={{ width: "100%" }}>{idx.idx.title}</h3>;
=======
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
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/DefaultItem.jsx

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
<<<<<<< HEAD:src/components/views/LandingPage/ThemeResult.jsx
                                rel="noopener noreferrer"
=======
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/DefaultItem.jsx
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
        </main>
    );
}

export default ThemeResult;
