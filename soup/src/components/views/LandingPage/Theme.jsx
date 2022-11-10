import React, { useState } from "react";

import '../../../css/Theme.css';
import Banner from "./Banner";

function Theme() {

    const [Shift, setShift] = useState("∥");

    const onClickShiftHandler = (e) => {
        e.currentTarget.value = e.currentTarget.value === "∥" ? "▶" : "∥";
        setShift(e.currentTarget.value);
    }

    // const [Page, setPage] = useState("1");
    const onClickRightHandler = (e) => {

    }


    const themeList = [
        {
            title: "당신의 집을 카페로 ☕",
            color: "#000",
            index: 1
        }, 
        {
            title: "제철 과일🍇🥝🍎",
            color: "#",
            index: 2
        }, 
        {
            title: "추워질 때 호호~ 겨울 음식 🍠",
            color: "#",
            index: 3
        }, 
        {
            title: "건강한 다이어트 🍴",
            color: "#",
            index: 4
        }, 
        {
            title: "비 오는 날, 밀키트 어때?",
            color: "#",
            index: 5
        }, 
        {
            title: "달콤한 간식 🥨",
            color: "#",
            index: 6
        }, 
        {
            title: "달콤한 간식 🥨",
            color: "#",
            index: 6
        }, 
        {
            title: "달콤한 간식 🥨",
            color: "#",
            index: 6
        }
    ]

    return (
        <div className="Theme container">
            {/* <Banner /> */}
            <div className="Title">
                <div className="theme-shift">
                        <button type="button">&lt;</button>
                        <button type="button" onClick={onClickShiftHandler} value={Shift}>{Shift}</button>
                        <button type="button" onClick={onClickRightHandler}>&gt;</button>
                </div>
                <div className="theme-group" style={{width: "100%"}}>
                    {themeList.map((theme, index) => (
                        <button type="button" key={index + 1} className="theme-btn ">{theme.title}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Theme;