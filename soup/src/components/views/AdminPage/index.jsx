import React, { useState } from "react";

import Header from "../Header";
import UserInfo from "./UserInfo";
import SetTheme from "./SetTheme";
import NotFound from "../NotFound";

import "../../../css/AdminPage.css";

function AdminPage({ isLogin, setIsLogin, category }) {
    const [path, setPath] = useState("theme");

    if (localStorage.getItem("role") === "ADMIN") {
        return (
            <div>
                {path === "userInfo" ? (
                    <div className="AdminPage container">
                        <Header isLogin={{ isLogin, setIsLogin }} />

                        <div className="AdminPage-content">
                            <div className="AdminMenu">
                                <h3>관리자 메뉴</h3>
                                <div className="menu-box">
                                    <button onClick={() => setPath("theme")}>
                                        테마 설정
                                    </button>
                                    <button onClick={() => setPath("userInfo")}>
                                        유저 정보
                                    </button>
                                </div>
                            </div>
                            <UserInfo />
                        </div>
                    </div>
                ) : (
                    <div className="AdminPage container">
                        <Header isLogin={{ isLogin, setIsLogin }} />
                        <div className="AdminPage-content">
                            <div className="AdminMenu">
                                <h3>관리자 메뉴</h3>
                                <div className="menu-box">
                                    <button onClick={() => setPath("theme")}>
                                        테마 설정
                                    </button>
                                    <button onClick={() => setPath("userInfo")}>
                                        유저 정보
                                    </button>
                                </div>
                            </div>
                            <SetTheme category={category} />
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return <NotFound />;
    }
}

export default AdminPage;
