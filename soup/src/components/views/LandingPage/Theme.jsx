import React, {useEffect, useState} from "react";

import { Link, useNavigate } from 'react-router-dom';

import '../../../css/Theme.css';
import axios from "axios";
import DefaultItem from "./DefaultItem";
import ThemeResult from "./ThemeResult";

function Theme(props) {
    const navigate = useNavigate();
    const [Shift, setShift] = useState("∥");

    const onClickShiftHandler = (e) => {
        e.currentTarget.value = e.currentTarget.value === "∥" ? "▶" : "∥";
        setShift(e.currentTarget.value);
    }
    const [themeList,setThemeList] = useState([
        {
            idx: 1,
            title: "테마1"
        }
    ]);
    const ClickButton = (e) => {
        navigate('/', {state: {
            idx : e.currentTarget.value, 
            title : e.currentTarget.innerText
    }});
    }

    useEffect(()=> {
        const getThemeList = async () => {
            try {
                axios.get('/search/main', {
                        headers: {
                            'x-access-token': localStorage.getItem('access_token')
                        }
                    }
                ).then(function (response) {
                    setThemeList(response.data.result.themeList);
                }).catch(function (error) {
                    alert('error');
                    console.log(error);
                });

            } catch (e) {
                alert('error');
                console.log(e);
            }
        };
        getThemeList();
    },[])


    return (
        <div className="Theme container">
            <div className="Banner">
                <Link to="/join" style={{display: "block", height: "100%", marginBottom: "40px"}}>
                    <div className="banner-item"></div>
                </Link>
            </div>
            <div className="Title">
                <div className="theme-shift">
                    <button type="button">&lt;</button>
                    <button type="button" onClick={onClickShiftHandler} value={Shift}>{Shift}</button>
                    <button type="button">&gt;</button>
                </div>
                <div className="theme-group" style={{width: "100%"}}>
                    {themeList.map((theme, index) => (
                        <button type="button" onClick={ClickButton} value={theme.idx} key={index + 1} className="theme-btn">{theme.title}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Theme;