import React from "react";

import Header from "../Header";
import SetTheme from "./setTheme";

import "../../../css/AdminPage.css"
import UserInfo from "./UserInfo";

function AdminPage({ isLogin, setIsLogin, category }) {
    console.log("gg", localStorage.getItem("id"));
    if (localStorage.getItem("id") === "admin") {
        if (window.location.pathname === "/admin/userinfo") {
            return (
                <div className="AdminPage container">
                    <Header isLogin={{ isLogin, setIsLogin }} />

                    <div className="AdminPage-content">
                        <div className="AdminMenu">
                            <h3>관리자 메뉴</h3>
                            <div className="menu-box">
                                <button onClick={() => window.location.pathname="/admin/theme"}>테마 설정</button>
                                <button onClick={() => window.location.pathname="/admin/userinfo"}>유저 정보</button>
                            </div>
                        </div>
                        <UserInfo />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="AdminPage container">
                    <Header isLogin={{ isLogin, setIsLogin }} />
                    <div className="AdminPage-content">
                        <div className="AdminMenu">
                            <h3>관리자 메뉴</h3>
                            <div className="menu-box">
                                <button onClick={() => window.location.pathname="/admin/theme"}>테마 설정</button>
                                <button onClick={() => window.location.pathname="/admin/userinfo"}>유저 정보</button>
                            </div>
                        </div>
                        <SetTheme category={category} />
                    </div>
                </div>
            );
        }
    }
}

export default AdminPage;