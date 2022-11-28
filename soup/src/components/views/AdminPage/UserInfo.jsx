import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import "../../../css/AdminPage.css";
import Header from "../Header";

function UserInfo() {

    const [UserList, setUserList] = useState([]);
   
        axios({
            url: 'http://localhost:8000/admin/members', 
            method: 'get'
        })
        .then(function (response) {
            console.log(response)
            console.log(response.data.result)
            setUserList(response.data.result)
        });
    


    return (
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
    );
}

export default UserInfo;
