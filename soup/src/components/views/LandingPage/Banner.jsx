import React from "react";

import { Link } from 'react-router-dom';

import '../../../css/Theme.css';

function Banner() {

    // const [Page, setPage] = useState("1");
    // const onClickRightHandler = (e) => {

    // }

    return (
        <div className="Banner">
            <Link to="#" className="banner-link">
                <div className="banner-item" >
                    <img src={require("../../../img/banner.png")} alt="banner" />
                </div>
            </Link>
            <Link to="#" className="banner-link">
                <div className="banner-item" >
                    <img src={require("../../../img/banner.png")} alt="banner" />
                </div>
            </Link>
            <Link to="#" className="banner-link">
                <div className="banner-item" >
                    <img src={require("../../../img/banner.png")} alt="banner" />
                </div>
            </Link>
            <Link to="#" className="banner-link">
                <div className="banner-item" >
                    <img src={require("../../../img/banner.png")} alt="banner" />
                </div>
            </Link>
        </div>
    );    
}
export default Banner;

