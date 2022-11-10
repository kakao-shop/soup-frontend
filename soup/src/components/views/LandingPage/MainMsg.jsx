import React from "react";


export default function MainMsg() {
    const user = {
        nickname: "아람"
    }
    
    const result = user.nickname === "" ? <h3 style={{width: "100%"}}>인기 상품</h3> : <div><h3 id="nickname" style={{display: "inline-block", margin: "0 10px 0 0"}}>{user.nickname}</h3><span>님을 위한 추천 상품</span></div>;
    
    return (
        <div>{result}</div>
    )
}