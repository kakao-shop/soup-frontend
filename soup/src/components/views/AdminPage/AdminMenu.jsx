import React, { useState } from "react";
import { Link, Navigate, Route, Router, Routes } from "react-router-dom";

import "../../../css/AdminPage.css";

// function SubCategoryList(location) {

//     console.log(location.state);
//     if (location.state !== undefined) {

function AdminMenu() {
    return (
        <div className="AdminMenu">
            <h3>관리자 메뉴</h3>
            <div className="menu-box">
                <Link to="/admin/theme"><button type="button">테마 설정</button></Link>
                <Link to="/admin/userinfo"><button type="button">유저 정보</button></Link>
            </div>
        </div>
    );
}

export default AdminMenu;
