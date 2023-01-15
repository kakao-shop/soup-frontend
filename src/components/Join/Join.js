import Panel from "../UI/Panel/Panel";

import classes from "./Join.module.css";

const Join = (props) => {
  return (
    <Panel>
      <h2>회원가입</h2>
      <form>
        <div className="form-input">
          <label>아이디</label>
          <div className={classes["join-id"]}>
            <input
              id="join-id"
              type="text"
              minLength="5"
              maxLength="12"
              placeholder="ID 입력 (5~12자)"
            />
            <button className={classes["dup-btn"]}>중복확인</button>
          </div>
        </div>
        <div className="form-input">
          <label>닉네임</label>
          <input
            type="text"
            minLength="2"
            maxLength="10"
            id="join-nickname"
            placeholder="닉네임 입력 (2~10자)"
          />
        </div>
        <div className="form-input">
          <label>비밀번호</label>
          <input
            type="password"
            minLength="6"
            maxLength="15"
            id="join-pw"
            placeholder="비밀번호 입력 (6~15자)"
          />
        </div>
        <div className="form-input">
          <label>비밀번호 확인</label>
          <input
            type="password"
            minLength="6"
            maxLength="15"
            id="join-pwcheck"
            placeholder="비밀번호 재입력"
          />
        </div>
        <div className="form-input">
          <label>생년월일</label>
          <input
            type="text"
            id="join-birth"
            minLength="8"
            maxLength="8"
            placeholder="ex) 19910101"
          />
        </div>
        <div className="form-input">
          <label>성별</label>
          <div className={classes["join-gender"]}>
            <input type="radio" value="M" id="male" />
            <label>남</label>
          </div>
          <div className={classes["join-gender"]}>
            <input type="radio" value="W" id="female" />
            <label>여</label>
          </div>
        </div>
        <button>회원가입</button>
      </form>
    </Panel>
  );
};

export default Join;
