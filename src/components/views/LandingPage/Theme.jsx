import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { reissuanceAccessToken } from "../../jwtTokenModules";

import { reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/Theme.css";
import "../../../css/SubCategoryList.css";
import "../../../css/ItemList.css";
import "../../../css/Pagination.css";

function Theme() {
    const navigate = useNavigate();

    const bannerShift = useRef(0);
    const [themeList, setThemeList] = useState([
        {
            idx: 1,
            title: "테마1",
        },
    ]);

    const ClickButton = (e) => {
        const bannerList = document.getElementById("BannerList");

        navigate("/", {
            state: {
                idx: e.currentTarget.value,
                title: e.currentTarget.innerText,
            },
        });

        bannerShift.current = Number(e.target.id) * -1050;
        bannerList.animate(
            {
                transform: [`translateX(${bannerShift.current}px)`]
            },
            {
                duration: 500,
                fill: "forwards",
<<<<<<< HEAD:src/components/views/LandingPage/Theme.jsx
                easing: "ease",
=======
                easing: "ease"
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/Theme.jsx
            }
        );
    };

    const titleShift = useRef(0);
    const onClickShiftHandler = (e) => {
        const themeContainer = document.querySelector(
            ".Theme .theme-container"
        );
        const themeWidth = themeContainer.clientWidth;
        const maxShift = themeWidth - 950;

        if (e.target.id === "right-shift-btn") {
            if (titleShift.current >= -maxShift) {
                titleShift.current = titleShift.current - 100;
            }
        } else if (e.target.id === "left-shift-btn") {
            if (titleShift.current < 0)
                titleShift.current = titleShift.current + 100;
        }
        themeContainer.animate(
            {
                transform: [`translateX(${titleShift.current}px)`]
            },
            {
                duration: 500,
<<<<<<< HEAD:src/components/views/LandingPage/Theme.jsx
                fill: "forwards",
                easing: "ease",
=======
                fill: "forwards", 
                easing: "ease"
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/Theme.jsx
            }
        );
    };

    useEffect(() => {
        const getThemeList = async () => {
            axios
                .get("/search/main", {
                    headers: {
<<<<<<< HEAD:src/components/views/LandingPage/Theme.jsx
                        "x-access-token": localStorage.getItem("accessToken"),
                    },
=======
                        "x-access-token": localStorage.getItem("accessToken")
                    }
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/Theme.jsx
                })
                .then(function(response) {
                    setThemeList(response.data.result.themeList);
                })
                .catch(function(error) {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
<<<<<<< HEAD:src/components/views/LandingPage/Theme.jsx
                        toast.error("테마 정보를 불러올 수 없습니다. 😥", {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true,
                        });
=======
                        alert("테마 정보를 불러올 수 없습니다.");
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/Theme.jsx
                        console.log(error);
                    }
                });
        };
        getThemeList();
    }, []);

    return (
        <div className="Theme container">
            <div id="BannerList">
<<<<<<< HEAD:src/components/views/LandingPage/Theme.jsx
                {themeList[0].title === "테마1" ? (
                    <div className="banner-item">
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/img/banner0.png"
                            }
                            alt="banner0"
                            className="banner-img"
                        />
                    </div>
                ) : (
                    themeList.map((theme, index) => (
                        <Link
                            to="/theme"
                            state={{ themeIdx: `${theme.idx}` }}
                            key={`banner${index}`}
                        >
                            <div className="banner-item">
                                <img
                                    src={
                                        "data:image/png;base64," + theme.banner
                                    }
                                    alt={`banner${index}`}
                                    className="banner-img"
                                />
                            </div>
                        </Link>
                    ))
                )}
=======
                {themeList.map((theme, index) => (
                    <Link
                        to="/theme"
                        state={{ themeIdx: `${theme.idx}` }}
                        key={`banner${index}`}
                    >
                        <div className="banner-item">
                            <img
                                src={"data:image/png;base64," + theme.banner}
                                alt={`banner${index}`}
                                className="banner-img"
                            />
                        </div>
                    </Link>
                ))}
>>>>>>> bc990ed00ffa5afad748eee05769f3cfcea8032a:soup/src/components/views/LandingPage/Theme.jsx
            </div>
            <div className="Title container">
                <div className="theme-shift" onClick={onClickShiftHandler}>
                    <button type="button">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/left-arrow.png`}
                            alt="shift button"
                            id="left-shift-btn"
                        />
                    </button>
                    <button type="button" id="right-shift-btn">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/right-arrow.png`}
                            alt="shift button"
                            id="right-shift-btn"
                        />
                    </button>
                </div>
                <div className="theme-group" style={{ width: "100%" }}>
                    <div className="theme-container">
                        {themeList.map((theme, index) => (
                            <button
                                type="button"
                                onClick={ClickButton}
                                value={theme.idx}
                                key={index + 1}
                                className="theme-btn"
                                id={index}
                            >
                                {theme.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={700}
                transition="Slide"
                hideProgressBar
                closeOnClick
                rtl={false}
                pauseOnHover
                draggable={false}
            />
        </div>
    );
}

export default Theme;
