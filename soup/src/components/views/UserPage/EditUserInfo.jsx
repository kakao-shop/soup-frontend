import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../Header';
import Nav from '../Nav';

import '../../../css/UserPage.css';


// function ConfirmPw(user) {
function EditUserInfo() {
    
    const result = {
        id: "12345id",
        nickname: "소비머신",
        password: "123456",
        birthday: "20000113",
        gender: "W"
    }

    const [Nickname, setNickname] = useState(`${result.nickname}`);
    const [Password, setPassword] = useState(`${result.password}`);
    const [Birth, setBirth] = useState(`${result.birthday}`);
    // const [Gender, setGender] = useState("");
    const [Gender, setGender] = useState(`${result.gender}`);
    
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onNicknameHandler = (e) => {
        setNickname(e.currentTarget.value);
    };

    const onBirthHandler = (e) => {
        setBirth(e.currentTarget.value);
    };

    const onGenderHandler = (e) => {
        setGender(e.currentTarget.value);
    };
    
    const onEditHandler = (e) => {
      e.preventDefault();
    }; 
    
    const onSecessionHandler = (e) => {
      e.preventDefault();
    }; 

    return (
        <div>
            <Header /> 
            <Nav />
            <div>
                <main className="ConfirmPw container">
                    <div className="square">
                        <h2>회원 정보 수정</h2>
                        <form action="">
                            <div>
                                <label htmlFor="user-id">ID</label>
                                <span id="user-id">{result.id}</span>
                            </div>
                            <div>            
                                <label htmlFor="edit-nick">닉네임</label>
                                <input type="text" value={Nickname} minLength="2" maxLength="10" onChange={onNicknameHandler} id="edit-nick" className="form-label" />
                            </div>
                            <div>            
                                <label htmlFor="usercheck-pw">비밀번호</label>
                                <input type="password" value={Password} minLength="6" maxLength="15" onChange={onPasswordHandler} id="usercheck-pw" className="form-label" />
                            </div>
                            <div>
                                <label htmlFor="join-birth">생년월일</label>
                                <input type="text" value={Birth} onChange={onBirthHandler} id="join-birth"/>  
                            </div>
                            <div>
                                <label htmlFor="">성별</label>
                                <div>
                                    <input type="radio" value="M" onChange={onGenderHandler} id="male" checked={Gender === "M"} />
                                    <label htmlFor="male">남자</label>
                                    <input type="radio" disabled value="W" onChange={onGenderHandler} id="female" checked={Gender === "W"} />
                                    <label htmlFor="female">여자</label> 
                                </div> 
                            </div>
                            <button type="submit" className="page-btn btn" id="edit-btn" onClick={onEditHandler}>수정</button>
                            <button type="submit" className="page-btn btn" id="secession-btn" onClick={onSecessionHandler}>회원탈퇴</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default EditUserInfo;