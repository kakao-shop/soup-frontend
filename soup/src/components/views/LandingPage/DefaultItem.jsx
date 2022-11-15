import React, { useState, useEffect } from "react";
import axios from "axios";

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

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get("/search/main", {
                    headers: {
                        "x-access-token": localStorage.getItem("access_token"),
                    },
                });
                setProduct(response.data.result.recommendResult);
            } catch (e) {
                alert("error");
                console.log(e);
            }
        };
        getProduct();
    }, []);

    const user = {
        nickname: localStorage.getItem("nickname"),
    };

    const result =
        user.nickname === null ? (
            <h3 style={{ width: "100%" }}>인기 상품</h3>
        ) : (
            <div>
                <h3
                    id="nickname"
                    style={{ display: "inline-block", margin: "0 10px 0 0" }}
                >
                    {user.nickname}
                </h3>
                <span>님을 위한 추천 상품</span>
            </div>
        );

    return (
        <main className="DefaultItem container">
            <div className="default-item">
                {result}
                <div className="item-list">
                    {product.map((item, index) => (
                        <div key={"default" + index} className="item">
                            <a href={item.webUrl} className="item-link">
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
                                    {item.price}원
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

export default DefaultItem;
