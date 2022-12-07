import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

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
                .get("/search/collections/" + idx.idx.idx, {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    }
                })
                .then((response) => {
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
                    }
                });
        };
        getProduct();
    }, [idx]);

    const result = <h3 style={{ width: "100%" }}>{idx.idx.title}</h3>;

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
        </main>
    );
}

export default ThemeResult;
