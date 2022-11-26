import React, { useState, useEffect } from "react";
import axios from "axios";

import { getCookie, reissuanceAccessToken } from "../../jwtTokenModules";


function UserInfo() {
    const [UserList, setUserList] = useState([]);

    useEffect(() => {
        const refreshToken = getCookie("refreshToken");
        axios
            .get("/admin/members", {
                Cookie: {refreshToken},
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setUserList(response.data.result);
            })
            .catch((error) => {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    alert("유저 정보를 확인할 수 없습니다.");
                    console.log(error);
                }
            });
    }, []);

    return (
        <div className="UserInfo">
            <h3>유저 정보</h3>
            <table className="userInfo">
                <thead className="table-header">
                    <tr>
                        <th scope="col">Member Index</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">ID</th>
                        <th scope="col">Last Access Time</th>
                        <th scope="col">Total Access Count</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {UserList.map((user, index) => (
                        <tr className="user" key={`user${index + 1}`}>
                            <th scope="row">{user.memberIdx}</th>
                            <td>{user.nickname}</td>
                            <td>{user.id}</td>
                            <td>{user.lastAccessTime}</td>
                            <td>{user.totalAccessCnt}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserInfo;
