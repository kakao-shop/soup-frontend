import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import "../../../css/AdminPage.css";

function SetTheme({ category }) {
    const [ThemeList, setThemeList] = useState([]);

    const subValue = useRef([]);

    const [ThemeName, setThemeName] = useState();
    const [L, setL] = useState([]);


    useEffect(() => {
        axios.get("/admin/collections", {
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }})
        .then(function (response) {
            console.log("admin", response);
            setThemeList(response.data.result.themeList);
        });
    }, [L]);

    const deleteTheme = (e, idx) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            console.log("삭제");
            e.target.parentNode.remove();
            axios
                .delete(`/admin/collections/${idx}`,{
                    headers: {
                        'x-access-token': localStorage.getItem('access_token')
                    }}
                )
                .then(function (response) {
                    alert("테마가 삭제되었습니다.");
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    alert("삭제가 불가능합니다.");
                });
        }
    };

    function changeSub(e) {
        const subSelect = e.target.nextSibling.nextSibling;
        subSelect.innerHTML = "";
        const currentCate = category.filter(function (cate) {
            return cate.main === e.target.value;
        })[0].sub;

        subValue.current = currentCate;
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
    };

    const saveTheme = (e) => {
        axios
            .post('/admin/collections', {
                title: `${ThemeName}`,
                categoryList: L,
            },{
                headers: {
                    'x-access-token': localStorage.getItem('access_token')
                }}
            )
            .then(function (response) {
                console.log(response.data);
                alert("테마 저장에 성공했습니다.");
                setL([]);
            })
            .catch(function (error) {
                console.log(error);
                alert("테마 저장에 실패했습니다.");
            });
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
            <form action="/" className="theme-right">
                <label>테마이름</label>
                <input
                    type="text"
                    onChange={(e) => setThemeName(e.target.value)}
                />
                <label>카테고리 대분류</label>
                <select name="main" className="chosenMain" onChange={changeSub}>
                    {category.map((cate, index) => (
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
                <div className="result"></div>
                <button type="button" onClick={saveTheme}>
                    테마 저장
                </button>
            </form>
        </div>
    );
}

export default SetTheme;