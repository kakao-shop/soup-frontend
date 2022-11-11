import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../Header';
import Nav from '../Nav';

import '../../../css/UserPage.css';
import axios from 'axios';
import { useEffect } from 'react';


// function ConfirmPw(user) {
function EditUserInfo({isLogin, setIsLogin}) {
    const [Id, setId] = useState('');
    const [Nickname, setNickname] = useState('');
    const [Password, setPassword] = useState('');
    const [Birth, setBirth] = useState('');
    const [Gender, setGender] = useState('');
    
        useEffect(() => {
            axios.get('/members/mypage', 
        {
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        }
        ).then(function (response) {
            setNickname(response.data.result.nickname)
            setId(response.data.result.id)
            setBirth(response.data.result.birthday)
            setGender(response.data.result.gender)
        }).catch(function (error) {
            alert('error');
            console.log(error);  
        });
        })

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onGenderHandler = (e) => {
        setGender(e.currentTarget.value);
    }
    
    const onEditHandler = (e) => {
        axios.patch('/members/mypage', {
            password : `${Password}`,
            nickname : `${Nickname}`
        },
        {
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(function (response) {
          let result = response.data;
          
          if (response.status === 200) {
            alert('비밀번호 변경이 완료되었습니다!');
            console.log(response);
            document.location.href = '/confirmPw'
    
          }

     }).catch(function (error) {
         alert('비밀번호 형식을 맞춰주세요! 비밀번호 입력(6~15자)');
         console.log(error);  
     });
    }; 
    
    const onSecessionHandler = (e) => {
        axios.delete('/members/mypage', 
        {
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(function (response) {

          if (response.status === 200) {
            alert('회원탈퇴 성공');
            console.log(response);
            localStorage.removeItem('access_token')
            localStorage.removeItem('id')
            localStorage.removeItem('nickname')
            document.location.href = '/'
          }

     }).catch(function (error) {
         alert('비밀번호 형식을 맞춰주세요! 비밀번호 입력(6~15자)');
         console.log(error);  
     });
    }; 

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin}/>
            <Nav />
            <div>
                <main className="ConfirmPw container">
                    <div className="square">
                        <h2>비밀 번호 변경</h2>
                        <form action="">
                            <div>
                                <label htmlFor="user-id">ID</label>
                                <span id="user-id">{Id}</span>
                            </div>
                            <div>            
                                <label htmlFor="edit-nick">닉네임</label>
                                <span id="user-id">{Nickname}</span>
                            </div>
                            <div>            
                                <label htmlFor="usercheck-pw">비밀번호</label>
                                <input type="password" name={Password} minLength="6" maxLength="15" onChange={onPasswordHandler} id="usercheck-pw" className="form-label" />
                            </div>
                            <div>
                                <label htmlFor="join-birth">생년월일</label>
                                <span id="user-id">{Birth}</span>  
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