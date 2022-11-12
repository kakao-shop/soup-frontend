import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div>
            <h1>Not Found</h1>
            <p>유효하지 않은 페이지 입니다.</p>
            <Link to="/">메인으로 이동</Link>
        </div>
    );
}

export default NotFound;