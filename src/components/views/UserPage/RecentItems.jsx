import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/RecentItems.css";

function RecentItems({ categoryList }) {
    const [recentItems, setRecentItems] = useState([
        {
            cat: "없음",
            count: 1,
            id: "null",
            imgSrc: "null",
            memberidx: 0,
            pid: "null",
            prdName: "null",
            price: "null",
            purchase: "null",
            score: "null",
            site: "null",
            subcat: "null",
            updateat: "null",
            webUrl: "null",
        }
    ]);
    axios
        .get("/search/recent", {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        })
        .then((response) => {
            setRecentItems(response.data.result.result);
        })
        .catch((error) => {
            if (error.response.data.code === 4002) {
                reissuanceAccessToken(error);
            } else {
                toast.error('최근 본 상품 내역을 불러올 수 없습니다. 😥', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
                console.log(error);
            }
        });

    return (
        <div>
            <Header />
            <Nav categoryList={categoryList} />
            <main className="RecentItems container">
                <h2>최근 본 상품</h2>
                <div className="recent-item">
                    <div className="item-list">
                        {recentItems.map((item, index) => (
                            <div key={"default" + index} className="item">
                                <a
                                    href={item.webUrl}
                                    onClick={() => urlSendHandler(item)}
                                    className="item-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.site === "홈플러스" && item.imgSrc === "null" ? (
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
                                    <span className="item-cate">
                                        {item.subcat}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
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

export default RecentItems;
