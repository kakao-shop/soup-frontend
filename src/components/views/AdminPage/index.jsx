import React, { useState } from "react";

import Header from "../Header";
import UserInfo from "./UserInfo";
import SetTheme from "./SetTheme";
import ViewDashboard from "./ViewDashBoard";
import NotFound from "../NotFound";

import "../../../css/AdminPage.css";

function AdminPage({ categoryList }) {
    const [path, setPath] = useState("theme");

    if (localStorage.getItem("role") === "ADMIN") {
        console.log(categoryList);
        return (
            <div>
                {path === "userInfo" ? (
                    <div className="AdminPage container">
                        <Header />

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
                                    <button onClick={() => setPath("dashboard")}>
                                        대시보드
                                    </button>
                                </div>
                            </div>
                            <UserInfo />
                        </div>
                    </div>
                ) : path === "theme" ? (
                    <div className="AdminPage container">
                        <Header />
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
                                    <button onClick={() => setPath("dashboard")}>
                                        대시보드
                                    </button>
                                </div>
                            </div>
                            <SetTheme categoryList={categoryList} />
                        </div>
                    </div>
                ) : (
                    <div className="AdminPage container">
                        <Header />
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
                                    <button onClick={() => setPath("dashboard")}>
                                        대시보드
                                    </button>
                                </div>
                            </div>
                            <ViewDashboard />
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
