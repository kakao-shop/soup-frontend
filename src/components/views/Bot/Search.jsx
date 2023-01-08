import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import { urlSendHandler } from "../../SelectItemCount";
import { reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/BotSearchResult.css";

const Search = ({ steps, previousStep, triggerNextStep }) => {
    const [result, setResult] = useState([]);
    const recoTotalElements = useRef(0);
    const [search, setSearch] = useState("");
    const [param, setParam] = useState("");
    const [idx, setIdx] = useState("");

    const componentDidMount = async () => {
        const search = previousStep.value;
        const param = previousStep.metadata.param;
        setParam(param);
        setSearch(search);
        
        if (param === "category") {
            setIdx(steps.triggerMaker.value);
            await axios
                .get("/search/subcat", {
                    params: {
                        category: `${search}`,
                    },
                })
                .then((response) => {
                    setResult(response.data.result.result.content);
                    recoTotalElements.current =
                        response.data.result.result.totalElements;
                })
                .catch((error) => {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
<<<<<<< HEAD:src/components/views/Bot/Search.jsx
                        toast.error('해당 카테고리 상품 정보를 불러올 수 없습니다. 😥', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });
=======
                        alert("해당 카테고리 상품 정보를 불러올 수 없습니다.");
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/Bot/Search.jsx
                        console.log(error);
                    }
                });
        } else if (param === "theme") {
            await axios
                .get(`/search/collections/${search}`, {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    }
                })
                .then((response) => {
                    setResult(response.data.result.result.content);
                    recoTotalElements.current =
                        response.data.result.result.totalElements;
                })
                .catch((error) => {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
<<<<<<< HEAD:src/components/views/Bot/Search.jsx
                        toast.error('해당 테마 상품 정보를 불러올 수 없습니다. 😥', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });
=======
                        alert("해당 테마 상품 정보를 불러올 수 없습니다.");
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/Bot/Search.jsx
                        console.log(error);
                    }
                });
        } else {
            await axios
                .get("/bot/today-best", {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    },
                    params: {
                        site: `${search}`,
                    },
                })
                .then((response) => {
                    setResult(response.data.result.content);
                    recoTotalElements.current =
                        response.data.result.totalElements;
                    console.log(recoTotalElements.current, response.data.result);
                })
                .catch((error) => {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
<<<<<<< HEAD:src/components/views/Bot/Search.jsx
                        toast.error(`${search}의 상품 정보를 불러올 수 없습니다. 😥`, {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });
=======
                        alert(`${search}의 상품 정보를 불러올 수 없습니다.`);
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/Bot/Search.jsx
                        console.log(error);
                    }
                });
        }
    };

    useEffect(() => {
        componentDidMount();
    }, []);
    const triggerNext = () => {
        triggerNextStep();
    };

    return (
        <div className="searchResult scroll">
            <div className="result-list">
                <h4>상품 조회 결과</h4>
                {result.length !== 0 ? (
                    <div className="result-container">
                        {result.map((item, index) => (
                            <a
                                href={item.webUrl}
                                onClick={(e) => urlSendHandler(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="result-item"
                                key={item.id}
                            >
                                <div className="item-img">
                                    {item.imgSrc !== null ? (
                                        <img
                                            src={item.imgSrc}
                                            alt={`${item.prdName}`}
                                        />
                                    ) : (
                                        <img
                                            src={
                                                process.env.PUBLIC_URL +
                                                "/img/no-img.png"
                                            }
                                            alt={`${item.prdName}`}
                                        />
                                    )}
                                </div>
                                <div className="item-name">{item.prdName}</div>
                                <div className="item-price">
                                    {item.price.toLocaleString()} 원
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="result-container">
                        <div id="no-result">상품 검색 결과가 없습니다.</div>
                    </div>
                )}
                {recoTotalElements.current > 10 ? (
                    <Link
                        className="btn again-btn"
                        to={`/${param}`}
                        state={
                            `${param}` === "theme"
                                ? { themeIdx: `${search}` }
                                : `${param}` === "category"
                                ? { idx: `${idx}`, subcat: `${search}` }
                                : { site: `${search}`, size: 100 }
                        }
                    >
                        더보기
                    </Link>
                ) : (
                    <div></div>
                )}
                <button onClick={triggerNext} className="again-btn btn">
                    처음으로
                </button>
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
};

export default Search;
