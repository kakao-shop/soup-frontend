import React from "react";
import { Link } from "react-router-dom";

import './Avatar.css';

export default function Avatar() {
    return (
        <Link to="/confirmPw"><img src="img/user.png" alt="user" className="avatar" />
        </Link>
    );
};
