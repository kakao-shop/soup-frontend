import React from "react";
import { Link } from "react-router-dom";

import "../../../css/AdminPage.css";

// function SubCategoryList(location) {

//     console.log(location.state);
//     if (location.state !== undefined) {

function AdminMenu() {
    
    if (localStorage.getItem("id") === "admin") {
    return (
        <div className="AdminMenu">
            <h3>관리자 메뉴</h3>
            <div className="menu-box" onClick={(e) => console.log(e.target)}>
                <Link to="setTheme"><button type="button">테마 설정</button></Link>
                <Link to="userinfo"><button type="button">유저 정보</button></Link>
            </div>
        </div>
    );
}}

export default AdminMenu;