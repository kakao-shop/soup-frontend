import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

import { getCookie, reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/AdminPage.css";

function SetTheme({ categoryList }) {
    const [ThemeList, setThemeList] = useState([]);
    const subValue = useRef([]);
    const [ThemeName, setThemeName] = useState();
    const [L, setL] = useState([]);

    useEffect(() => {
        const refreshToken = getCookie('refreshToken');
        axios
            .get("/admin/collections", {
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
                Cookie: {refreshToken}
            })
            .then((response) => {
                setThemeList(response.data.result.themeList);
            })
            .catch((error) => {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    alert("테마 정보를 불러올 수 없습니다.");
                    console.log(error);
                }
            });
    }, [L]);

    const deleteTheme = (e, idx) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            const refreshToken = getCookie('refreshToken');
            axios
                .delete(`/admin/collections/${idx}`, {
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken"),
                    },
                    Cookie: {refreshToken}
                })
                .then((response) => {
                    alert("테마가 삭제되었습니다.");
                    e.target.parentNode.remove();
                })
                .catch(function(error) {
                    if (error.response.data.code === 4002) {
                        reissuanceAccessToken(error);
                    } else {
                        alert("삭제가 불가능합니다.");
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
            alert("5개까지 선택 가능");
        } else {
            let subCategory = e.target.value;
            let mainCategory = e.target.previousSibling.previousSibling.value;
            if (
                subCategory !== "소분류 선택" &&
                mainCategory !== "대분류 선택"
            ) {
                setL([...L, { mainCategory, subCategory }]);
                const chosenDiv = document.createElement("div");
                chosenDiv.setAttribute("class", "chosenDiv");
                const chosenCategories = document.createElement("div");
                chosenCategories.setAttribute("class", "chosenData");
                chosenCategories.innerText = `${mainCategory}>${subCategory}`;

                const categoryDeleteBtn = document.createElement("button");
                categoryDeleteBtn.setAttribute("class", "deleteCategoryBtn");
                categoryDeleteBtn.setAttribute("type", "button");
                categoryDeleteBtn.innerText = "X";
                categoryDeleteBtn.onclick = (e) => {
                    e.target.parentNode.remove();
                };

                chosenDiv.appendChild(chosenCategories);
                chosenDiv.appendChild(categoryDeleteBtn);

                e.target.nextSibling.appendChild(chosenDiv);
            }
        }
    };

    const saveTheme = (e) => {
        e.preventDefault();
        const formData = new FormData();

        let noDupl;
        for (let i of document.getElementById("result").childNodes) {
            const mainCategory = i.innerText.match(/[^A-Za-z0-9]*[\>]/)[0].replace(">", "");
            const subCategory = i.innerText.match(/[\>][^A-Za-z0-9]*/)[0].replace(">", "");
            setL([...L, { mainCategory, subCategory}]);
            noDupl = _.uniqBy(L, "subCategory");
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
            if (L.length > 1) {
                const refreshToken = getCookie("refreshToken");
                axios
                    .post("/admin/collections", formData, {
                        Cookie: {refreshToken},
                        headers: {
                            "x-access-token": localStorage.getItem(
                                "accessToken"
                            ),
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then(function(response) {
                        alert("테마 저장에 성공했습니다.");
                        setL([]);

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
                        } else {
                            alert("테마 저장에 실패했습니다.");
                            console.log(error);
                        }

                    });
            } else {
                alert("카테고리를 2개 이상 지정해 주세요.");
            }
        } else {
            alert("테마 이름을 지정해 주세요.");
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
        </div>
    );
}

export default SetTheme;
