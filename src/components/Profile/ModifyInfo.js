import { useContext, useEffect, useState } from "react";
import api from "../../apis/auth";
import classes from "./ModifyInfo.module.css";

import Panel from "../UI/Panel/Panel";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ModifyInfo = (props) => {
    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [pw, setPw] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("M");

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const handlePwChange = (e) => {
        setPw(e.target.value);
    };

    const handleModifyClick = (e) => {
        e.preventDefault();
        const data = {
            password: pw,
            nickname: nickname,
        };
        api.patch("/member/mypage", data)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleWithdrawClick = (e) => {
        e.preventDefault();
        const answer = window.confirm("정말 탈퇴하시겠습니까?");
        if (answer) {
            api.delete("/members/mypage")
                .then((res) => {
                    authCtx.onLogout();
                    alert("탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        api.get("/members/mypage")
            .then((res) => {
                const info = res.data.result;

                setId(info.id);
                setNickname(info.nickname);
                setBirthday(info.birthday);
                setGender(info.gender);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <Panel>
            <h2>마이 페이지</h2>
            <form className="info-form">
                <div className="form-input">
                    <label>아이디</label>
                    <span>{id}</span>
                </div>
                <div className="form-input">
                    <label>닉네임</label>
                    <span>{nickname}</span>
                </div>
                <div className="form-input">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        placeholder="변경할 비밀번호 입력 (6~15자)"
                        onChange={handlePwChange}
                        value={pw}
                    />
                </div>
                <div className="form-input">
                    <label>생년월일</label>
                    <span>{birthday}</span>
                </div>
                <div className="form-input">
                    <label>성별</label>
                    <div className={classes["info-gender"]}>
                        <input
                            type="radio"
                            value="M"
                            id="male"
                            checked={gender === "M"}
                            disabled
                        />
                        <label>남</label>
                    </div>
                    <div className={classes["info-gender"]}>
                        <input
                            type="radio"
                            value="W"
                            id="female"
                            checked={gender === "W"}
                            disabled
                        />
                        <label>여</label>
                    </div>
                </div>
                <div className={classes["btn-group"]}>
                    <button
                        className={classes["info-btn"]}
                        onClick={handleModifyClick}
                    >
                        수정
                    </button>
                    <button
                        className={classes["info-btn"]}
                        onClick={handleWithdrawClick}
                    >
                        탈퇴
                    </button>
                </div>
            </form>
        </Panel>
    );
};

export default ModifyInfo;
