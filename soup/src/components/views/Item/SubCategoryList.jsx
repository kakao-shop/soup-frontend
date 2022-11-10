import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../../css/SubCategoryList.css";

// function SubCategoryList(location) {

//     console.log(location.state);
//     if (location.state !== undefined) {

function SubCategoryList(props) {
    const subList = props.data.sub.item;
    const title = props.data.main;

    if (props.data !== undefined) {
        return (
            <div className="SubCategoryList container">
                <h2>{title}</h2>
                <div className="subCategoryBox">
                    {subList.map((sub, index) => (
                        <Link className="subBtn" key={`cateSub${index + 1}`}><button>{sub}</button></Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default SubCategoryList;
