import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../../../css/CategoryPage.css';

function SubCategoryList(props) {
    console.log(props.data)
    if (props.data !== undefined) {
        return (
            <div>SubCategoryList</div>
        )
    }
}

export default SubCategoryList;