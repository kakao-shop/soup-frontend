import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import "../../../css/AdminPage.css";
import Header from "../Header";

function UserInfo({ isLogin, setIsLogin, category }) {

    const [UserList, setUserList] = useState([]);
    
    useEffect(() => {
        axios({
            url: '/members', 
            method: 'get'
        })
        .then(function (response) {
            console.log(response);
            setUserList(response.data.result)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

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
        <div className="UserInfo">
            <h3>유저 정보</h3>
            <table className="userInfo">
                <thead className="table-header">
                    <tr>
                        <th scope="col">memberIdx</th>
                        <th scope="col">nickname</th>
                        <th scope="col">id</th>
                        <th scope="col">password</th>
                        <th scope="col">birthday</th>
                        <th scope="col">gender</th>
                        <th scope="col">role</th>
                        <th scope="col">oauth</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {UserList.map((user, index) => (
                        <tr className="user" key={`user${index+1}`}>
                            <th scope="row">{user.memberIdx}</th>
                            <td>{user.nickname}</td>
                            <td>{user.id}</td>
                            <td>{user.password}</td>
                            <td>{user.birthday}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>
                            <td>{user.auth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
        
    );
}

export default UserInfo;