import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../Header';
import Nav from '../Nav';

// import '.css';


// function ConfirmPw(user) {
function ConfirmPw() {
    
    const user = {
        id: "12345id",
        pw: "1234"
    }

    const [Password, setPassword] = useState("");
    
    const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {
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
                                <span id="user-id">{user.id}</span>
                            </div>
                            <div>            
                                <label htmlFor="usercheck-pw">비밀번호</label>
                                <input type="password" value={Password} minLength="6" maxLength="15" onChange={onPasswordHandler} id="usercheck-pw" className="form-label" />
                            </div>
                            <button type="submit" className="page-btn btn" onClick={onSubmitHandler}>비밀번호 확인</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default ConfirmPw;