import React from "react";

import UserInfo from "./UserInfo";
import SetTheme from "./SetTheme";
import Header from "../Header";

import "../../../css/AdminPage.css";

function AdminPage({ isLogin, setIsLogin, category }) {
    if (localStorage.getItem("id") === "admin") {
        // if (window.location.pathname === "/admin/userInfo") {
        //     return (
        //         <div className="AdminPage container">
        //             <Header isLogin={{ isLogin, setIsLogin }} />

        //             <div className="AdminPage-content">
        //                 <div className="AdminMenu">
        //                     <h3>관리자 메뉴</h3>
        //                     <div className="menu-box">
        //                         <button onClick={() => window.location.pathname="/admin/theme"}>테마 설정</button>
        //                         <button onClick={() => window.location.pathname="/admin/userinfo"}>유저 정보</button>
        //                     </div>
        //                 </div>
        //                 <UserInfo />
        //             </div>
        //         </div>
        //     );
        // } else   {
            return (
                
                <div className="AdminPage container">
                    <div className="AdminPage-content">
                        <SetTheme category={category} />
                    </div>
                </div>
            );
        }
    }
// }

export default AdminPage;