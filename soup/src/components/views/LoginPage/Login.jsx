import React, { useState } from 'react';
import { Link } from "react-router-dom";

// import '.css';


function Login() {

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <main className="Login container">
            <div className="square">
                <h2>로그인</h2>
                <form action="">
                    <div>
                        <label htmlFor="login-id">ID</label>
                        <input type="text" value={Id} minLength="5" maxLength="12" onChange={onIdHandler} id="login-id" className="form-label" />
                    </div>
                    <div>
                        <label htmlFor="login-pw">비밀번호</label>
                        <input type="password" value={Password} minLength="6" maxLength="15" onChange={onPasswordHandler} id="login-pw" className="form-label" />
                    </div>
                    <button type="submit" className="page-btn btn" onClick={onSubmitHandler}>로그인</button>
                </form>
                <Link to="/join" id="join-link">회원가입</Link>
            </div>
        </main>
    )

}

export default Login;

