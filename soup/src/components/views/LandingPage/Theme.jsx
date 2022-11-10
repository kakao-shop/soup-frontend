import React, { useState } from "react";

import { Link } from 'react-router-dom';

import '../../../css/Theme.css';

function Theme() {

    const [Shift, setShift] = useState("∥");

    const onClickShiftHandler = (e) => {
        e.currentTarget.value = e.currentTarget.value === "∥" ? "▶" : "∥";
        setShift(e.currentTarget.value);
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
            <div className="Banner">
                <Link to="/join" style={{display: "block", height: "100%", marginBottom: "40px"}}>
                    <div className="banner-item"></div>
                </Link>
            </div>
            <div className="Title">
                <div className="theme-shift">
                        <button type="button">&lt;</button>
                        <button type="button" onClick={onClickShiftHandler} value={Shift}>{Shift}</button>
                        <button type="button">&gt;</button>
                </div>
                <div className="theme-group" style={{width: "100%"}}>
                    {themeList.map((theme, index) => (
                        <button type="button" key={index + 1} className="theme-btn">{theme.title}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Theme;