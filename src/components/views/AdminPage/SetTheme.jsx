import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getCookie, reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/AdminPage.css";

function SetTheme({ categoryList }) {
    const [ThemeList, setThemeList] = useState([]);
    const subValue = useRef([]);
    const [ThemeName, setThemeName] = useState();

    useEffect(() => {
        const refreshToken = getCookie('refresh.errorToken');
        axios
            .get("/admin/collections", {
                Cookie: {refreshToken},
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                }
            })
            .then((response) => {
                setThemeList(response.data.result.themeList);
            })
            .catch((error) => {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('테마 정보를 불러올 수 없습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    }, []);

    const deleteTheme = (e, idx) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            const refreshToken = getCookie('refreshToken');
            axios
                .delete(`/admin/collections/${idx}`, {
                    Cookie: {refreshToken},
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken"),
                    }
                })
                .then((response) => {
                    toast.success('테마가 삭제되었습니다. 😊', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    
                    setTimeout(() => {
                        e.target.parentNode.remove();
                    }, 800);
                })
                .catch((error) => {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
                        toast.error('삭제가 불가능합니다. 😥', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });
                        console.log(error);
                    }
                });
        }
    };

    function changeSub(e) {
        const subSelect = e.target.nextSibling.nextSibling;
        subSelect.innerHTML = "";
        const currentCate = categoryList.filter(function(cate) {
            return cate.main === e.target.value;
        })[0].sub.item;
        subValue.current = currentCate;
        subSelect.innerHTML += `<option>소분류 선택</option>`;
        subValue.current.map(
            (sub, index) =>
                (subSelect.innerHTML += `<option value=${sub} key=${sub}sub id=suboption${index}>${sub}</option>`)
        );
    }

    const categoryResult = (e) => {
        if (e.target.nextSibling.childElementCount === 5) {
            toast.warn('카테고리는 5개까지 지정 가능합니다. 😅', {
                autoClose: 700,
                transition: Slide,
                hideProgressBar: true
            });
        } else {
            let subCategory = e.target.value;
            let mainCategory = e.target.previousSibling.previousSibling.value;
            if (subCategory !== "소분류 선택" && mainCategory !== "대분류 선택") {
                const chosenDiv = document.createElement("div");
                chosenDiv.setAttribute("class", "chosenDiv");
                const chosenCategories = document.createElement("div");
                chosenCategories.setAttribute("class", "chosenData");
                chosenCategories.innerText = `${mainCategory}>${subCategory}`;

                const categoryDeleteBtn = document.createElement("button");
                categoryDeleteBtn.setAttribute("class", "deleteCategoryBtn");
                categoryDeleteBtn.setAttribute("type", "button");
                categoryDeleteBtn.innerText = "X";
                categoryDeleteBtn.onclick = (e) => {e.target.parentNode.remove();};

                chosenDiv.appendChild(chosenCategories);
                chosenDiv.appendChild(categoryDeleteBtn);

                e.target.nextSibling.appendChild(chosenDiv);
            }
        }
    };

    const saveTheme = (e) => {
        e.preventDefault();
        const formData = new FormData();

        let noDupl = [];
        for (let i of document.getElementById("result").childNodes) {
            const mainCategory = i.innerText.match(/[^A-Za-z0-9]*[>]/)[0].replace(">", "");
            const subCategory = i.innerText.match(/[>][^A-Za-z0-9][^\n]*/)[0].replace(">", "");
            noDupl.push({"mainCategory": mainCategory, "subCategory": subCategory})
            noDupl = _.uniqBy(noDupl, "subCategory");
        }
        formData.append(
            "themeReq",
            new Blob(
                [JSON.stringify({ title: `${ThemeName}`, categoryList: noDupl })],
                { type: "application/json" }
            )
        );
        formData.append("image", document.getElementById("themeImage-input").files[0]);
        
        if (document.getElementById("themeTitle-input").value !== "") {
            if (noDupl.length > 1) {
                const refreshToken = getCookie("refreshToken");
                axios
                    .post("/admin/collections", formData, {
                        Cookie: {refreshToken},
                        headers: {
                            "x-access-token": localStorage.getItem(
                                "accessToken"
                            ),
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function(response) {
                        toast.success('테마 저장에 성공했습니다. 😊', {
                            autoClose: 700,
                            transition: Slide,
                            hideProgressBar: true
                        });

                        document.getElementById("themeTitle-input").value = "";
                        document.getElementById("themeImage-input").value = "";
                        while (document.getElementById("result").hasChildNodes()) {
                            document.getElementById("result").removeChild(
                                document.getElementById("result").firstChild
                            );
                        }
                    })
                    .catch(function(error) {
                        if (error.response.data.code === 4002) {
                            reissuanceAccessToken(error);
                        } else if (error.response.data.message === "could not execute statement; SQL [n/a]; nested exception is org.hibernate.exception.DataException: could not execute statement") {
                            toast.error('배너 저장 시 이미지 형식으로 저장해야 합니다. 😥', {
                                autoClose: 700,
                                transition: Slide,
                                hideProgressBar: true
                            });
                            console.log(error);
                        } else {
                            toast.error('테마 저장에 실패했습니다. 😥', {
                                autoClose: 700,
                                transition: Slide,
                                hideProgressBar: true
                            });
                            console.log(error);
                        }

                    });
            } else {
                toast.warn('카테고리를 2개 이상 지정해 주세요. 😅', {
                    autoClose: 700,
                    transition: Slide,
                    hideProgressBar: true
                });
            }
        } else {
            toast.warn('테마 이름을 지정해 주세요. 😅', {
                autoClose: 700,
                transition: Slide,
                hideProgressBar: true
            });
        }
    };

    return (
        <div className="SetTheme">
            <div className="theme-left">
                <h3>테마 설정</h3>
                <div className="theme-box">
                    {ThemeList.map((theme, index) => (
                        <div className="theme-list" key={`theme${index}`}>
                            <div
                                className={`theme${theme.idx} ${index}`}
                                key={`t-item${index}`}
                            >
                                {theme.title}
                            </div>
                            <button
                                type="button"
                                className={`btn${theme.idx}`}
                                key={`t-btn${index}`}
                                onClick={(e) => {
                                    deleteTheme(e, theme.idx);
                                }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <form
                action="/"
                className="theme-right"
                encType="multipart/form-data"
                onSubmit={saveTheme}
            >
                <label>테마이름</label>
                <input
                    id="themeTitle-input"
                    type="text"
                    required
                    onChange={(e) => setThemeName(e.target.value)}
                />
                <label>테마 이미지</label>
                <input
                    id="themeImage-input"
                    type="file"
                    name="image"
                    required
                />
                <label>카테고리 대분류</label>
                <select name="main" className="chosenMain" onChange={changeSub}>
                    <option>대분류 선택</option>
                    {categoryList.map((cate, index) => (
                        <option
                            value={cate.main}
                            key={cate.main}
                            id={`mainoption${index}`}
                        >
                            {cate.main}
                        </option>
                    ))}
                </select>
                <label>카테고리 소분류</label>
                <select name="sub" id="chosenSub" onChange={categoryResult}>
                    <option>소분류 선택</option>
                </select>
                <div id="result"></div>
                <button type="submit" className="bt save-btn">
                    테마 저장
                </button>
            </form>
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

export default SetTheme;
